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
import Simulation.Encoding exposing (encodeEdge, encodeGraph, encodeNodeLabel)
import Simulation.GraphUpdates exposing (addEdge, addNode)
import Simulation.Init.Generators as Generators exposing (..)
import Simulation.Model exposing (..)
import Simulation.Simulation as Simulation exposing (..)
import Simulation.SimulationInterop exposing (..)
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

        DaySummary ->
            update (SendBotChatItem <| Narrative.daySummary model) model

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
            update RenderPhiNetwork { model | weather = weather }

        RenderPhiNetwork ->
            ( model, renderPhiNetwork <| encodeGraph model.network )

        AnimateGeneration ->
            ( model, animateGeneration <| encodeGraph model.network )

        AnimatePeerConsumption ->
            ( model, animatePeerConsumption <| encodeGraph model.network )

        AnimationFinished phase ->
            case phase of
                "layoutRendered" ->
                    update AnimateGeneration model
                "generatorsAnimated" ->
                    update AnimatePeerConsumption model
                "consumptionAnimated" ->
                    update NoOp model
                _ ->
                    update NoOp model

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
            changeDesign model

        McaRunDay ->
            runDay model
                |> andThen update DaySummary

        McaSelectLocation _ ->
            model ! []

        _ ->
            model ! []


runDay : Model -> ( Model, Cmd Msg )
runDay model =
    let
        newNetwork =
            model.network
                |> Simulation.joulesToGenerators model.weather
                |> Simulation.distributeGeneratedJoules model.negawattLimit model.reputationRatio
                |> Simulation.tradingPhase

        newModel =
            { model | network = newNetwork }
    in
    newModel
        ! [ Generators.generateWeather ]
        |> andThen update RenderPhiNetwork


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


changeDesign : Model -> ( Model, Cmd Msg )
changeDesign model =
    let
        chatMsg =
            BotMessage "Sorry that's not available yet!"
    in
    update (SendBotChatItem chatMsg) model
