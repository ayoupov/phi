module Simulation.Helpers exposing (..)

import Graph exposing (Node)
import Simulation.Model exposing (Coords, Housing, NodeLabel(..), PhiNetwork, Potential, PotentialNodeType(PotentialHousing))
import Simulation.NodeList exposing (..)
import Set exposing (Set)


getCoords : NodeLabel -> Coords
getCoords nodeLabel =
    case nodeLabel of
        GeneratorNode n ->
            n.pos

        BatNode n ->
            n.pos

        HousingNode n ->
            n.pos

        ResilientHousingNode n ->
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


liveNodeNetwork : PhiNetwork -> PhiNetwork
liveNodeNetwork network =
    network
        |> Graph.nodes
        |> List.filterMap (Maybe.map .id << isLiveNode)
        |> (\idList -> Graph.inducedSubgraph idList network)

isHousingNode : Node NodeLabel -> Maybe (Node NodeLabel)
isHousingNode node =
    case node.label of
        HousingNode _ ->
            Just (node)

        _ ->
            Nothing


housingNodeNetwork : PhiNetwork -> PhiNetwork
housingNodeNetwork network =
    network
        |> Graph.nodes
        |> List.filterMap (Maybe.map .id << isHousingNode)
        |> (\idList -> Graph.inducedSubgraph idList network)


toHousing : Node NodeLabel -> Maybe Housing
toHousing { label, id } =
    case label of
        HousingNode housing ->
            Just housing

        _ ->
            Nothing


findFlooded : Int -> PhiNetwork -> List (Node NodeLabel)
findFlooded floodLevel network =
    let
        allFlooded =
            case floodLevel of
                1 ->
                    flood1List
                2 ->
                    flood2List
                3 ->
                    flood3List
                4 ->
                    flood4List
                5 ->
                    flood5List

                _ ->
                    Set.fromList
                        []

        isInFlooded: (Node NodeLabel) -> Maybe (Node NodeLabel)
        isInFlooded node =
            case node.label of
                HousingNode n ->
                    if (Set.member (ceiling n.pos.x, ceiling n.pos.y) allFlooded) then
                        Just (node)
                    else
                        Nothing
                _ ->
                    Nothing

        housing =
            housingNodeNetwork network

        housingNodes =
            Graph.nodes housing

    in
        Graph.nodes housing
            |> List.filterMap isInFlooded
