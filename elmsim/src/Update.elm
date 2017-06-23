module Update exposing (update)

import Action exposing (Msg(..))
import Chat.Chat exposing (parseUserMessage, sendToEliza)
import Chat.Model exposing (..)
import Chat.Narrative as Narrative
import Dom.Scroll as Scroll
import Graph
import Json.Encode exposing (encode)
import Material
import Model exposing (Model)
import Simulation.BuildingMode exposing (handleConvertNode, handleConvertNodeRequest, handleNewLineRequest, toggleBuildMode)
import Simulation.Encoding exposing (encodeEdge, encodeGraph, encodeNodeLabel)
import Simulation.GraphUpdates exposing (addEdge, addNode, addNodeWithEdges, updateNodes)
import Simulation.Helpers exposing (liveNodeNetwork)
import Simulation.Init.Generators as Generators exposing (..)
import Simulation.Model exposing (..)
import Simulation.Simulation as Simulation exposing (..)
import Simulation.SimulationInterop exposing (..)
import Simulation.WeatherList exposing (restWeather, weatherTupleToWeather)
import Task
import Update.Extra exposing (andThen)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        noOp =
            model ! []

        scrollDown =
            Task.attempt (always NoOp) <| Scroll.toBottom "toScroll"

        addChatItem chatMsg model =
            { model | messages = chatMsg :: model.messages }
    in
    case msg of
        NoOp ->
            noOp

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

                    newModel =
                        addChatItem chatMsg clearedInputModel
                in
                ( newModel, scrollDown )
                    |> andThen update (parseUserMessage model.input)

        SendBotChatItem chatItem ->
            ( addChatItem (BotItem chatItem) model
            , scrollDown
            )

        CheckWeather ->
            weatherForecast model

        CheckBudget ->
            update (SendBotChatItem <| BotMessage (toString model.budget)) model

        DaySummary ->
            --            update (SendBotChatItem <| Narrative.daySummary model) model
            update (SendBotChatItem <| Narrative.dayBeginning model) model

        CallTurn ->
            runDay model
                |> andThen update DaySummary

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
            { model | network = handleNewLineRequest nodeId1 nodeId2 model.network }
                |> update RenderPhiNetwork

        AddGeneratorWithEdges searchRadius generator ->
            { model | network = addNodeWithEdges searchRadius (GeneratorNode generator) model.network }
                |> update RenderPhiNetwork

        AddPeerWithEdges searchRadius peer ->
            { model | network = addNodeWithEdges searchRadius (PeerNode peer) model.network }
                |> update RenderPhiNetwork

        AddGenerator node ->
            { model | network = addNode (GeneratorNode node) model.network }
                |> update RenderPhiNetwork

        AddPeer node ->
            { model | network = addNode (PeerNode node) model.network }
                |> update RenderPhiNetwork

        AddEdge edge ->
            { model | network = addEdge edge model.network }
                |> update RenderPhiNetwork

        UpdateWeather weather ->
            update RenderPhiNetwork { model | weather = weather, weatherList = restWeather model.weatherList }

        RenderPhiNetwork ->
            ( model, renderPhiNetwork <| encodeGraph model.network )

        AnimateGeneration ->
            ( model, animateGeneration <| encodeGraph model.network )

        AnimatePeerConsumption ->
            ( model, animatePeerConsumption <| encodeGraph model.network )

        AnimateTrade ->
            ( model, animateTrade <| encodeGraph model.network )

        AnimationFinished phase ->
            case phase of
                "layoutRendered" ->
                    update AnimateGeneration model

                "generatorsAnimated" ->
                    update (SendBotChatItem <| Narrative.dayGenerated model) model
                        |> andThen
                            update
                            AnimatePeerConsumption

                "consumptionAnimated" ->
                    update (SendBotChatItem <| Narrative.dayConsumed model) model
                        |> andThen
                            update
                            AnimateTrade

                "tradeAnimated" ->
                    update (SendBotChatItem <| Narrative.dayTraded model) model

                "enterBuildModeAnimated" ->
                    model
                        |> update (SendBotChatItem <| Narrative.enterBuildMode)

                "exitBuildModeAnimated" ->
                    update (SendBotChatItem <| Narrative.exitBuildMode) model

                _ ->
                    update NoOp model

        ToggleBuildMode isEnteringBuildMode ->
            ( model, toggleBuildMode isEnteringBuildMode )

        MultiChoiceMsg multiChoiceAction ->
            let
                newModel =
                    addChatItem (UserMessage <| mcaName multiChoiceAction) model
            in
            handleMultiChoiceMsg multiChoiceAction newModel

        ToggleInputType ->
            case model.inputType of
                FreeTextInput ->
                    { model | inputType = MultiChoiceInput } ! []

                MultiChoiceInput ->
                    { model | inputType = FreeTextInput } ! []

        SendToEliza userChatMessage ->
            model ! [ sendToEliza userChatMessage ]



-- HELPERS


handleMultiChoiceMsg : MultiChoiceAction -> Model -> ( Model, Cmd Msg )
handleMultiChoiceMsg action model =
    case action of
        McaWeatherForecast ->
            weatherForecast model

        McaChangeDesign ->
            update (ToggleBuildMode True) model

        McaLeaveBuildMode ->
            update (ToggleBuildMode False) model

        McaRunDay ->
            runDay model
                |> andThen update DaySummary

        --                |> andThen update DaySummary
        McaSelectLocation _ ->
            model ! []

        _ ->
            model ! []


runDay : Model -> ( Model, Cmd Msg )
runDay model =
    let
        applyPhases : PhiNetwork -> PhiNetwork
        applyPhases network =
            network
                --                |> Debug.log "current nw"
                |> Simulation.joulesToGenerators model.weather
                |> Simulation.distributeGeneratedJoules model.negawattLimit model.reputationRatio
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

        --        newNetwork =
        --            applyPhases model.network
        newNetwork =
            joinNetworks (newNetworkList <| liveNodeNetwork model.network) model.network

        modelWithUpdatedNetwork =
            { model | network = newNetwork }

        newBudget =
            Simulation.updateBudget modelWithUpdatedNetwork

        newModel =
            { modelWithUpdatedNetwork | budget = newBudget }
    in
    newModel
        |> generateWeather model.weatherList
        --        ! [ generateWeather model.weatherList]
        |> andThen update RenderPhiNetwork
        |> andThen update AnimateGeneration


weatherForecast : Model -> ( Model, Cmd Msg )
weatherForecast model =
    let
        sunny =
            toString model.weather.sun

        windy =
            toString model.weather.wind

        chatMsg =
            BotMessage <|
                "Tomorrow should have "
                    ++ sunny
                    ++ " amount of sun, "
                    ++ "and "
                    ++ windy
                    ++ " amount of wind"
    in
    update (SendBotChatItem chatMsg) model
        |> andThen update
            (SendBotChatItem <| WidgetItem WeatherWidget)



--generateWeather : List WeatherTuple -> Cmd Msg


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
