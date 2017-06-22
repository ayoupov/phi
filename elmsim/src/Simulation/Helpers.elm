module Simulation.Helpers exposing (..)

import Graph exposing (Node)
import Simulation.Model exposing (Coords, NodeLabel(..))


getCoords : NodeLabel -> Coords
getCoords nodeLabel =
    case nodeLabel of
        GeneratorNode n ->
            n.pos

        BatNode n ->
            n.pos

        PeerNode n ->
            n.pos

        PotentialNode n ->
            n.pos


distBetweenNodes : Node NodeLabel -> Node NodeLabel -> Float
distBetweenNodes nodeA nodeB =
    let
        aPos =
            getCoords nodeA.label

        bPos =
            getCoords nodeB.label
    in
    sqrt ((bPos.x - aPos.x) ^ 2 + (bPos.y - aPos.y) ^ 2)


isLiveNode : Node NodeLabel -> Maybe (Node NodeLabel)
isLiveNode node =
    case node.label of
        PotentialNode _ ->
            Nothing

        _ ->
            Just node
