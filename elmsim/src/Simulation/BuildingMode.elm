port module Simulation.BuildingMode exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Json.Decode as Decode
import Json.Encode exposing (Value)
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

parseConvertNewLine : Value -> Value -> Msg
parseConvertNewLine x1 x2 =
    let
        result =
            Decode.decodeValue Decode.int x1
    in
    case result of
        Ok nodeId1 ->
            let
                r2 = Decode.decodeValue Decode.int x2
            in
            case r2 of
            Ok nodeId2 ->
                RequestNewLine nodeId1 nodeId2
            Err _ ->
                NoOp

        Err _ ->
            NoOp


handleConvertNodeRequest : NodeId -> PhiNetwork -> PhiNetwork
handleConvertNodeRequest nodeId phiNetwork =
    let
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