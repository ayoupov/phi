module Simulation.GraphUpdates exposing (..)

import Graph exposing (Edge, Node, NodeContext, NodeId)
import IntDict
import Set
import Simulation.Helpers exposing (distBetweenNodes, isLiveNode)
import Simulation.Model exposing (NodeLabel(PotentialNode), PhiNetwork, Potential, PotentialNodeType(..), TransmissionLine, tupleToCoords)
import Simulation.NodeList exposing (potentialHousingList, potentialResilientList, potentialWPSList)


addNode : NodeLabel -> PhiNetwork -> PhiNetwork
addNode nodeLabel network =
    let
        nodeId =
            Maybe.withDefault 0 <|
                Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange network)

        node =
            Node nodeId nodeLabel
    in
    Graph.insert (NodeContext node IntDict.empty IntDict.empty) network


addNodeWithEdges : Float -> NodeLabel -> PhiNetwork -> PhiNetwork
addNodeWithEdges searchRadius nodeLabel network =
    let
        nodeId =
            Maybe.withDefault 0 <|
                Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange network)

        newNode =
            Node nodeId nodeLabel

        isCloseEnough a b =
            distBetweenNodes a b < searchRadius

        closeNodes =
            network
                |> Graph.nodes
                |> List.filterMap isLiveNode
                |> List.filter (isCloseEnough newNode)

        newEdges =
            closeNodes
                |> List.map (createEdge nodeId << .id)

        outgoingEdges =
            closeNodes
                |> List.map (\node -> ( node.id, toString <| distBetweenNodes newNode node ))
                |> IntDict.fromList
    in
    Graph.insert (NodeContext newNode IntDict.empty outgoingEdges) network


edgeLabel : NodeId -> NodeId -> String
edgeLabel a b =
    toString a ++ "-" ++ toString b


addEdge : TransmissionLine -> PhiNetwork -> PhiNetwork
addEdge edge network =
    Graph.fromNodesAndEdges (Graph.nodes network) (edge :: Graph.edges network)


createEdge : NodeId -> NodeId -> TransmissionLine
createEdge a b =
    Edge a b <| edgeLabel a b


nodeUpdater n foundCtx =
    case foundCtx of
        Just ctx ->
            Just { ctx | node = n }

        Nothing ->
            Nothing


updateNodes : List (Node NodeLabel) -> PhiNetwork -> PhiNetwork
updateNodes updatedNodeList network =
    case updatedNodeList of
        [] ->
            network

        node :: tail ->
            network
                |> Graph.update node.id (node |> nodeUpdater)
                |> updateNodes tail


graphFromNodeList : List NodeLabel -> PhiNetwork
graphFromNodeList nodes =
    List.foldr addNode Graph.empty nodes


potentialNodesList : List NodeLabel
potentialNodesList =
    let

        wpsList =
            potentialWPSList
                |> Set.toList
                |> List.map
                    (PotentialNode << Potential PotentialWPS << tupleToCoords)

        housingList =
            potentialHousingList
                |> Set.toList
                |> List.map
                    (PotentialNode << Potential PotentialHousing << tupleToCoords)

--        resilientList =
--            potentialResilientList
--                |> Set.toList
--                |> List.map
--                    (PotentialNode << Potential PotentialResilientHousing << tupleToCoords)
    in
    wpsList ++ housingList
--    spList ++ wpsList ++ housingList
