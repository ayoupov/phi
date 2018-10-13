module Update exposing (update)

import Action exposing (Msg(..))
import Chat.Chat as Chat
import Chat.ChatLog exposing (logMessage)
import Chat.Encoding exposing (encodeChatItem)
import Chat.Model exposing (..)
import Chat.Narrative as Narrative
import Dom.Scroll as Scroll
import Graph
import Json.Encode exposing (encode)
import ListHelpers exposing (addToFirstElement)
import Material
import Model exposing (Model, initNetworkGenerators)
import Simulation.BuildingMode exposing (changeBuildMode, handleConvertNode, handleNewLineRequest)
import Simulation.Encoding exposing (encodeEdge, encodeGraph, encodeNodeLabel)
import Simulation.GraphUpdates exposing (addEdge, addNode, addNodeWithEdges, updateNodes)
import Simulation.Helpers exposing (liveNodeNetwork)
import Simulation.Init.Generators as Generators exposing (..)
import Simulation.Model exposing (..)
import Simulation.Simulation as Simulation exposing (..)
import Simulation.SimulationInterop exposing (..)
import Simulation.Stats exposing (updateStats, updateStatsThisDay)
import Simulation.WeatherList exposing (restWeather, weatherTupleToWeather)
import Task
import Update.Extra exposing (addCmd, andThen, updateModel)


addChatItem : ChatItem -> Model -> ( Model, Cmd Msg )
addChatItem chatMsg model =
    { model | messages = chatMsg :: model.messages }
        ! [ logMessage <| encodeChatItem chatMsg ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        noOp =
            model ! []

        scrollDown =
            Task.attempt (always NoOp) <| Scroll.toBottom "toScroll"
    in
    case msg of
        NoOp ->
            noOp

        ToggleInputAvailable bool ->
            { model | inputAvailable = bool } ! []

        Input newInput ->
            ( { model | input = newInput }, Cmd.none )

        Mdl message_ ->
            Material.update Mdl message_ model

        SendUserChatMsg ->
            if String.isEmpty model.input then
                noOp
            else
                let
                    chatMsg =
                        UserMessage model.input

                    clearedInputModel =
                        { model | input = "" }

                    botResponse : Cmd Msg
                    botResponse =
                        Chat.handleTextInputMessage model.input
                in
                addChatItem chatMsg clearedInputModel
                    |> addCmd scrollDown
                    |> addCmd botResponse

        SendBotChatItem chatItem ->
            let
                updateMcaList model =
                    case chatItem of
                        MultiChoiceItem mcMessage ->
                            { model | mcaList = mcMessage.options }

                        _ ->
                            model
            in
            model
                |> addChatItem (BotItem chatItem)
                |> updateModel updateMcaList
                |> addCmd scrollDown

        SetMCAList mcaList ->
            { model | mcaList = mcaList } ! []

        ProcessNarrative chatItems ->
            ( model, Narrative.processNarrative chatItems )

        ShowMap ->
            model ! [ Narrative.showMap () ]

        CheckWeather ->
            weatherForecast model

        CheckBudget ->
            update (SendBotChatItem <| BotMessage (toString model.budget)) model

        DaySummary ->
            --            update (SendBotChatItem <| Narrative.daySummary model) model
            update (SendBotChatItem <| Narrative.dayBeginning model.network) model

        CallTurn ->
            runDay model
                |> andThen update IncrementDayCount

        --|> andThen update DaySummary
        DescribeNode n ->
            model
                |> (Graph.get n model.network
                        |> Maybe.map (.node >> .label >> encodeNodeLabel >> encode 4)
                        |> Maybe.withDefault "Node not found :("
                        |> (SendBotChatItem << BotMessage)
                        |> update
                   )

        RequestConvertNode nodeId ->
            -- NEED LOGIC TO HANDLE BUDGET
            handleConvertNode nodeId model
                |> andThen update RenderPhiNetwork

        RequestNewLine nodeId1 nodeId2 ->
            -- NEED LOGIC TO HANDLE BUDGET
            { model
                | network = handleNewLineRequest nodeId1 nodeId2 model.network
                , budget = addToFirstElement model.budget -10
            }
                |> update RenderPhiNetwork
                |> andThen update (SendBotChatItem <| BotMessage "Each line costs 10 phicoins")

        InitializeNetwork ->
            model ! initNetworkGenerators

        InitializeBudget ->
            { model | budget = 10000 :: model.budget } ! []

        AddGeneratorWithEdges searchRadius generator ->
            { model | network = addNodeWithEdges searchRadius (GeneratorNode generator) model.network }
                |> update RenderPhiNetwork

        AddPeerWithEdges searchRadius peer ->
            { model | network = addNodeWithEdges searchRadius (HousingNode peer) model.network }
                |> update RenderPhiNetwork

        AddGenerator node ->
            { model | network = addNode (GeneratorNode node) model.network }
                |> update RenderPhiNetwork

        AddHousing node ->
            { model | network = addNode (HousingNode node) model.network }
                |> updateStatsThisDay
                |> andThen update RenderPhiNetwork

        UpgradeHousing node ->
            { model | network = addNode (HousingNode node) model.network }
                |> updateStatsThisDay
                |> andThen update RenderPhiNetwork

        AddEdge edge ->
            { model | network = addEdge edge model.network }
                |> update RenderPhiNetwork

        UpdateWeather weather ->
            update RenderPhiNetwork { model | weather = weather, weatherList = restWeather model.weatherList }

        UpdateSiteName name ->
            let
                setName : String -> SiteInfo -> SiteInfo
                setName name info =
                    { info | name = name }

                newSiteInfo =
                    setName name model.siteInfo
            in
            { model | siteInfo = newSiteInfo } ! []

        UpdateSitePopulation pop ->
            let
                setPop : Int -> SiteInfo -> SiteInfo
                setPop pop info =
                    { info | population = pop }

                newSiteInfo =
                    setPop pop model.siteInfo
            in
            { model | siteInfo = newSiteInfo } ! []

        IncrementDayCount ->
            { model | dayCount = model.dayCount + 1 } ! []

        RenderPhiNetwork ->
            ( model, renderPhiNetwork <| encodeGraph model.network )

        AnimateGeneration ->
            ( model, animateGeneration <| encodeGraph model.network )

        AnimatePeerConsumption ->
            ( model, animateHousingConsumption <| encodeGraph model.network )

        AnimateTrade ->
            ( model, animateTrade <| encodeGraph model.network )

        AnimationFinished phase ->
            case phase of
                "layoutRendered" ->
                    update AnimateGeneration model

                "generatorsAnimated" ->
                    update (SendBotChatItem <| Narrative.dayGenerated model.network) model
                        |> andThen
                            update
                            AnimatePeerConsumption

                "consumptionAnimated" ->
                    update (SendBotChatItem <| Narrative.dayConsumed model.network) model
                        |> andThen
                            update
                            AnimateTrade

                "tradeAnimated" ->
                    update (SendBotChatItem <| Narrative.dayTraded model.network) model
                        |> andThen update (ToggleInputAvailable True)

                "enterBuildModeAnimated" ->
                    update NoOp model

                "exitBuildModeAnimated" ->
                    update NoOp model

                _ ->
                    update NoOp model

        ChangeBuildMode buildModeType ->
            case buildModeType of
                "peers" ->
                    ( model, changeBuildMode "peers" )
                        |> andThen update (SendBotChatItem <| Narrative.enterBuildModePeers)

                "generators" ->
                    ( model, changeBuildMode "generators" )
                        |> andThen update (SendBotChatItem <| Narrative.enterBuildModeGenerators)

                "lines" ->
                    ( model, changeBuildMode "lines" )
                        |> andThen update (SendBotChatItem <| Narrative.enterBuildModeLines)

                _ ->
                    ( model, changeBuildMode "none" )

        --|> andThen update (SendBotChatItem <| Narrative.exitBuildMode)
        StatsUpdate ->
            updateStats model

        MultiChoiceMsg multiChoiceAction ->
            let
                botResponse =
                    Chat.handleMultiChoiceMessage multiChoiceAction
            in
            addChatItem (UserMessage <| mcaName multiChoiceAction) model
                |> addCmd scrollDown
                |> addCmd botResponse

        SendToEliza userChatMessage ->
            model ! [ Chat.sendToEliza userChatMessage ]



-- HELPERS


runDay : Model -> ( Model, Cmd Msg )
runDay model =
    let
        applyPhases : PhiNetwork -> PhiNetwork
        applyPhases network =
            network
                |> Simulation.waterToGenerators model.weather
                |> Simulation.distributeGeneratedWater 100 model.reputationRatio
                |> Graph.mapNodes Simulation.consumeFromStorage
                |> Simulation.tradingPhase

        updateNetwork : PhiNetwork -> PhiNetwork -> PhiNetwork
        updateNetwork source target =
            updateNodes (Graph.nodes source) target

        joinNetworks : List PhiNetwork -> PhiNetwork -> PhiNetwork
        joinNetworks list network =
            List.foldr updateNetwork network list

        makeBidirectional : PhiNetwork -> PhiNetwork
        makeBidirectional nw =
            Graph.edges (Graph.reverseEdges nw)
                |> List.append (Graph.edges nw)
                |> Graph.fromNodesAndEdges (Graph.nodes nw)

        newNetworkList nw =
            makeBidirectional nw
                |> Graph.stronglyConnectedComponents
                |> List.map applyPhases

        newNetwork =
            joinNetworks (newNetworkList <| liveNodeNetwork model.network) model.network

        modelWithUpdatedNetwork =
            { model | network = newNetwork }

        newBudget =
            Simulation.updateBudget modelWithUpdatedNetwork.network modelWithUpdatedNetwork.budget

        newModel =
            { modelWithUpdatedNetwork | budget = newBudget }
    in
    newModel
        |> generateWeather model.weatherList
        |> andThen update (ChangeBuildMode "none")
        |> andThen update StatsUpdate
        |> andThen update RenderPhiNetwork
        |> andThen update AnimateGeneration


weatherForecast : Model -> ( Model, Cmd Msg )
weatherForecast model =
    let
        weather =
            pregenerateWeather model.weatherList

        sunny =
            toString weather.water

        windy =
            toString weather.wind

        chatMsg =
            BotMessage <|
                "I expect weather tomorrow to be "
                    ++ sunny
                    ++ " sun, "
                    ++ "and "
                    ++ windy
                    ++ " wind."
    in
    update (SendBotChatItem chatMsg) model
        |> andThen update
            (SetMCAList
                [ McaBuildHousing
                , McaUpgradeHousing
                , McaAddWP
                , McaWeatherForecast
                , McaRunDay
                ]
            )
        |> andThen update (ChangeBuildMode "none")



--        |> andThen update
--            (SendBotChatItem <| WidgetItem WeatherWidget)


pregenerateWeather : List WeatherTuple -> Weather
pregenerateWeather list =
    let
        currentWeather =
            list
                |> List.tail
                |> Maybe.withDefault [ ( 0.5, 0.5 ) ]
                |> List.head
                |> Maybe.withDefault ( 0.5, 0.5 )
                |> weatherTupleToWeather
    in
    currentWeather


generateWeather : List WeatherTuple -> (Model -> ( Model, Cmd Msg ))
generateWeather list =
    let
        currentList =
            restWeather list

        currentWeather =
            currentList
                |> List.head
                |> Maybe.withDefault ( 0.5, 0.5 )
                |> weatherTupleToWeather
    in
    update (UpdateWeather currentWeather)
