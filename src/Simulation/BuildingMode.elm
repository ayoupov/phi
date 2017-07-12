port module Simulation.BuildingMode exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(BotMessage))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Json.Decode as Decode
import Json.Encode exposing (Value)
import ListHelpers exposing (addToFirstElement, takeFirstElementWithDefault0)
import Model exposing (Model)
import Simulation.GraphUpdates exposing (addEdge, createEdge)
import Simulation.Helpers exposing (getCoords)
import Simulation.Init.Generators as Generators
import Simulation.Model exposing (..)


-- PORTS


port changeBuildMode : String -> Cmd msg


port requestConvertNode : (Value -> msg) -> Sub msg


port requestNewLine : (Value -> msg) -> Sub msg


parseConvertNodeRequest : Value -> Msg
parseConvertNodeRequest x =
    let
        result =
            Decode.decodeValue Decode.int x
    in
    case result of
        Ok nodeId ->
            RequestConvertNode nodeId

        Err _ ->
            NoOp


parseConvertNewLine : Value -> Msg
parseConvertNewLine x =
    let
        result =
            Decode.decodeValue (Decode.list Decode.int) x
    in
    case result of
        Ok list ->
            case list of
                head :: tail ->
                    let
                        first =
                            Debug.log "first" head

                        second =
                            Debug.log "second" (takeFirstElementWithDefault0 tail)
                    in
                    RequestNewLine first second

                _ ->
                    NoOp

        Err _ ->
            NoOp


handleConvertNode : NodeId -> Model -> ( Model, Cmd Msg )
handleConvertNode nodeId model =
    let
        networkWithoutOldNode =
            Graph.remove nodeId model.network

        maybeNodeLabel =
            Graph.get nodeId model.network
                |> Maybe.map (.node >> .label)

        nodeGenerator : NodeLabel -> Maybe ( Cmd Msg, ( PotentialNodeType, Phicoin ) )
        nodeGenerator nodeLabel =
            let
                coords =
                    getCoords nodeLabel
            in
            case nodeLabel of
                PotentialNode potential ->
                    case potential.nodeType of
                        PotentialWindTurbine ->
                            Just ( Generators.generateWindTurbine AddGenerator coords, ( PotentialWindTurbine, 200 ) )

                        PotentialSolarPanel ->
                            Just ( Generators.generatePVPanel AddGenerator coords, ( PotentialSolarPanel, 150 ) )

                        PotentialPeer ->
                            Just ( Generators.generatePeer AddPeer coords, ( PotentialPeer, 50 ) )

                _ ->
                    Nothing

        cmdTuple =
            maybeNodeLabel
                |> Maybe.andThen nodeGenerator

        cmd =
            cmdTuple
                |> Maybe.map Tuple.first
                |> Maybe.withDefault Cmd.none

        cost : Phicoin
        cost =
            cmdTuple
                |> Maybe.map Tuple.second
                |> Maybe.map Tuple.second
                |> Maybe.withDefault 0

        item : PotentialNodeType
        item =
            cmdTuple
                |> Maybe.map Tuple.second
                |> Maybe.map Tuple.first
                |> Maybe.withDefault PotentialPeer

        itemToMessage : PotentialNodeType -> Phicoin -> String
        itemToMessage t c =
            case t of
                PotentialWindTurbine ->
                    "You purchased a wind turbine, it costs " ++ toString c ++ " phicoin which has been deducted from your budget"

                PotentialSolarPanel ->
                    "You purchased a solar panel, it costs " ++ toString c ++ " phicoin which has been deducted from your budget"

                PotentialPeer ->
                    "You enabled a peer, the connection costs " ++ toString c ++ " phicoin which has been deducted from your budget"

        messageCmd : Cmd Msg
        messageCmd =
            delayMessage 0 (SendBotChatItem <| BotMessage (itemToMessage item cost))
    in
    { model | network = networkWithoutOldNode, budget = addToFirstElement model.budget -cost } ! [ cmd, messageCmd ]


handleNewLineRequest : NodeId -> NodeId -> PhiNetwork -> PhiNetwork
handleNewLineRequest a b phiNetwork =
    phiNetwork
        |> addEdge (createEdge a b)
