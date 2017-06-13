module Simulation.GraphUpdates exposing (..)

import Graph exposing (NodeId, Node, NodeContext,Edge)
import IntDict
import Simulation.Model exposing (NodeLabel, PhiNetwork, TransmissionLine)

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
