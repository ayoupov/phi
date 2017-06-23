port module Simulation.BuildingMode exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Json.Decode as Decode
import Json.Encode exposing (Value)
import ListHelpers exposing (takeFirstElementWithDefault0)
import Simulation.Model exposing (..)


-- PORTS


port toggleBuildMode : Bool -> Cmd msg


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


handleConvertNodeRequest : NodeId -> PhiNetwork -> PhiNetwork
handleConvertNodeRequest nodeId phiNetwork =
    let
        coords =
            Graph.get

        convertNode node =
            { node | label = convertNodeLabel node.label }

        convertNodeLabel label =
            case label of
                PotentialNode { nodeType, pos } ->
                    case nodeType of
                        PotentialGenerator ->
                            GeneratorNode { defaultGenerator | pos = pos }

                        PotentialPeer ->
                            PeerNode { defaultPeer | pos = pos }

                _ ->
                    label

        convertNodeContext nodeContext =
            { nodeContext | node = convertNode nodeContext.node }
    in
    Graph.get nodeId phiNetwork
        |> Maybe.map ((\nc -> Graph.insert nc phiNetwork) << convertNodeContext)
        |> Maybe.withDefault phiNetwork


handleNewLineRequest : NodeId -> NodeId -> PhiNetwork -> PhiNetwork
handleNewLineRequest nodeId1 nodeId2 phiNetwork =
    phiNetwork
