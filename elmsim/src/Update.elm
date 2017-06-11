module Update exposing (update)

import Action exposing (Msg(..))
import Chat.Model exposing (..)
import Chat.Chat exposing (parseUserMessage)
import Dom.Scroll as Scroll
import Graph
import Json.Encode exposing (encode)
import Model exposing (Model)
import Simulation.Model exposing (NodeLabel(..), encodeGraph, encodeNodeLabel)
import Simulation.Simulation as Simulation exposing (addEdge, addNode, renderPhiNetwork)
import Task
import Update.Extra exposing (andThen)


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

        Input newInput ->
            ( { model | input = newInput }, Cmd.none )

        SendUserChatMsg ->
            if String.isEmpty model.input then
                noOp
            else
                let
                    chatMsg =
                        UserMessage model.input

                    newModel =
                        { model
                            | input = ""
                            , messages = chatMsg :: model.messages
                        }
                in
                ( newModel, scrollDown )
                    |> andThen update (parseUserMessage model.input)

        SendBotChatItem chatItem ->
            ( { model | messages = (BotItem chatItem) :: model.messages }
            , scrollDown
            )

        CheckWeather ->
            let
                sunny =
                    toString model.weather.sun

                windy =
                    toString model.weather.wind

                chatMsg = BotMessage <|
                    "There's "
                        ++ sunny
                        ++ " amount of sun, "
                        ++ "and "
                        ++ windy
                        ++ " amount of wind"
            in
            update (SendBotChatItem chatMsg) model
            |> andThen update
              ( SendBotChatItem <| WidgetItem WeatherWidget )
        DaySummary ->
          let
              txt =
                "Last week we have generated a bunch of kWh in total, the community had consumed lots of energy, and some of has stored in the batteries. Do you want to know more before I go on?"
          in
          update (SendBotChatItem <| BotMessage txt) model

        CallTurn ->
            update (Tick 1) model
            |> andThen update CheckWeather
            |> andThen update DaySummary

        DescribeNode n ->
            model
                |> (Graph.get n model.network
                        |> Maybe.map (.node >> .label >> encodeNodeLabel >> encode 4)
                        |> Maybe.withDefault "Node not found :("
                        |> (SendBotChatItem << BotMessage)
                        |> update
                   )

        AddPVPanel node ->
            { model | network = addNode (PVNode node) model.network }
                |> update RenderPhiNetwork

        AddWindTurbine node ->
            { model | network = addNode (WTNode node) model.network }
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

        Tick n ->
            case n of
                0 ->
                    model ! [] |> andThen update RenderPhiNetwork

                _ ->
                    nextDay model
                        |> andThen update (Tick (n - 1))



-- HELPERS


nextDay : Model -> ( Model, Cmd Msg )
nextDay model =
    let
        newNetwork =
            model.network
                |> Simulation.joulesToGenerators model.weather
                |> Simulation.distributeGeneratedJoules

        newModel =
            { model | network = newNetwork }
    in
    newModel
        ! [ Simulation.generateWeather ]
        |> andThen update RenderPhiNetwork
