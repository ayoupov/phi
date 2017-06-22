module Simulation.GraphUpdates exposing (..)

import Graph exposing (Edge, Node, NodeContext, NodeId)
import IntDict
import Set
import Simulation.Model exposing (NodeLabel(PotentialNode), PhiNetwork, Potential, PotentialNodeType(PotentialGenerator, PotentialPeer), TransmissionLine, tupleToCoords)
import Simulation.NodeList exposing (potentialGeneratorList, potentialPeerList)


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


addEdge : TransmissionLine -> PhiNetwork -> PhiNetwork
addEdge edge network =
    Graph.fromNodesAndEdges (Graph.nodes network) (edge :: Graph.edges network)


createEdge : NodeId -> NodeId -> TransmissionLine
createEdge a b =
    Edge a b (toString a ++ "-" ++ toString b)


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
    case nodes of
        [] ->
            Graph.empty

        x :: xs ->
            addNode x (graphFromNodeList xs)


potentialNodesList : List NodeLabel
potentialNodesList =
    let
        genList =
            potentialGeneratorList
                |> Set.toList
                |> List.map
                    (PotentialNode << Potential PotentialGenerator << tupleToCoords)

        peerList =
            potentialPeerList
                |> Set.toList
                |> List.map
                    (PotentialNode << Potential PotentialPeer << tupleToCoords)
    in
    genList ++ peerList
