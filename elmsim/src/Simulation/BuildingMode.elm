port module Simulation.BuildingMode exposing (..)

import Action exposing (Msg(..))
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



--handleConvertNodeRequest : NodeId -> PhiNetwork -> PhiNetwork
--handleConvertNodeRequest nodeId phiNetwork =
--    let
--        convertNode node =
--            { node | label = convertNodeLabel node.label }
--
--        convertNodeLabel label =
--            case label of
--                PotentialNode { nodeType, pos } ->
--                    case nodeType of
--                        PotentialGenerator ->
--                            GeneratorNode { defaultGenerator | pos = pos }
--
--                        PotentialPeer ->
--                            PeerNode { defaultPeer | pos = pos }
--
--                _ ->
--                    label
--
--        convertNodeContext nodeContext =
--            { nodeContext | node = convertNode nodeContext.node }
--    in
--    Graph.get nodeId phiNetwork
--        |> Maybe.map ((\nc -> Graph.insert nc phiNetwork) << convertNodeContext)
--        |> Maybe.withDefault phiNetwork


handleConvertNode : NodeId -> Model -> ( Model, Cmd Msg )
handleConvertNode nodeId model =
    let
        networkWithoutOldNode =
            Graph.remove nodeId model.network

        maybeNodeLabel =
            Graph.get nodeId model.network
                |> Maybe.map (.node >> .label)

        nodeGenerator : NodeLabel -> Maybe ( Cmd Msg, Phicoin )
        nodeGenerator nodeLabel =
            let
                coords =
                    getCoords nodeLabel
            in
            case nodeLabel of
                PotentialNode potential ->
                    case potential.nodeType of
                        PotentialWindTurbine ->
                            Just ( Generators.generateWindTurbine AddGenerator coords, 200 )

                        PotentialSolarPanel ->
                            Just ( Generators.generatePVPanel AddGenerator coords, 150 )

                        PotentialPeer ->
                            Just ( Generators.generatePeer AddPeer coords, 50 )

                _ ->
                    Nothing

        cmdTuple =
            maybeNodeLabel
                |> Maybe.andThen nodeGenerator

        cmd =
            cmdTuple
                |> Maybe.map Tuple.first
                |> Maybe.withDefault Cmd.none

        cost =
            cmdTuple
                |> Maybe.map Tuple.second
                |> Maybe.withDefault 0
    in
    { model | network = networkWithoutOldNode, budget = addToFirstElement model.budget -cost } ! [ cmd ]


handleNewLineRequest : NodeId -> NodeId -> PhiNetwork -> PhiNetwork
handleNewLineRequest a b phiNetwork =
    phiNetwork
        |> addEdge (createEdge a b)
