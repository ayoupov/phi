module Simulation.Encoder exposing (..)

import Json.Encode as Json
import Graph exposing (Graph, Node)
import Simulation.Types exposing (..)

encodeList : (a -> Json.Value) -> List a -> Json.Value
encodeList encoder list = Json.list <| List.map encoder list

encodeNodeLabel : NodeLabel -> Json.Value
encodeNodeLabel nodeLabel =
  case nodeLabel of
    PVNode label ->
      Json.object
        [ ("maxGeneration", Json.float label.maxGeneration)
        , ("dailyGeneration", encodeList Json.float label.dailyGeneration)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "pvPanel")
        ]
    WTNode label ->
      Json.object
        [ ("maxGeneration", Json.float label.maxGeneration)
        , ("dailyGeneration", encodeList Json.float label.dailyGeneration)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "windTurbine")
        ]
    PeerNode label ->
      Json.object
        [ ("dailyConsumption", encodeList Json.float label.dailyConsumption)
        , ("joules", encodeList Json.float label.joules)
        , ("desiredConsumption", Json.float label.desiredConsumption)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "peer")
        ]
    BatNode label ->
      Json.object
        [ ("capacity", Json.float label.capacity)
        , ("storage", Json.float label.storage)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "battery")
        ]

encodeNode : Node NodeLabel -> Node Json.Value
encodeNode {id, label} = Node id (encodeNodeLabel label)


encodeCoords : Coords -> Json.Value
encodeCoords pos =
  Json.object [ ("x", Json.float pos.x)
              , ("y", Json.float pos.y)
              ]

pos : NodeLabel -> Coords
pos nodeLabel =
  case nodeLabel of
    PVNode  n -> n.pos
    WTNode  n -> n.pos
    BatNode n -> n.pos
    PeerNode n -> n.pos

encodeEdge: PhiNetwork -> TransmissionLine -> Maybe EncodedEdge
encodeEdge graph tLine =
  let
      maybeFrom = Maybe.map (pos << .label << .node) (Graph.get tLine.from graph)
      maybeTo = Maybe.map (pos << .label << .node) (Graph.get tLine.to graph)
      maybeLine = Maybe.map2 Line maybeFrom maybeTo
  in
      Maybe.map (EncodedEdge tLine) maybeLine


encodeGraph : PhiNetwork -> (List (Node Json.Value), List EncodedEdge)
encodeGraph graph =
  let
      encodedNodes = List.map encodeNode <| Graph.nodes graph
      tLines = List.filterMap (encodeEdge graph) <| Graph.edges graph
  in
      (encodedNodes, tLines)
