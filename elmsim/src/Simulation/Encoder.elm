module Simulation.Encoder exposing (..)

import Json.Encode as Json
import Graph exposing (Graph, Node)
import Simulation.Types exposing (..)

encodeNodeLabel : NodeLabel -> Json.Value
encodeNodeLabel nodeLabel =
  case nodeLabel of
    PVNode label ->
      Json.object
        [ ("maxGeneration", Json.float label.maxGeneration)
        , ("generatedEnergy", Json.float label.generatedEnergy)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "pvPanel")
        ]
    WTNode label ->
      Json.object
        [ ("maxGeneration", Json.float label.maxGeneration)
        , ("generatedEnergy", Json.float label.generatedEnergy)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "windTurbine")
        ]
    ResNode label ->
      Json.object
        [ ("dailyConsumption", Json.float label.dailyConsumption)
        , ("pos", encodeCoords label.pos)
        , ("nodeType", Json.string "residence")
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
    ResNode n -> n.pos

encodeEdge: Graph NodeLabel String -> TransmissionLine -> Maybe EncodedEdge
encodeEdge graph tLine =
  let
      maybeFrom = Maybe.map (pos << .label << .node) (Graph.get tLine.from graph)
      maybeTo = Maybe.map (pos << .label << .node) (Graph.get tLine.to graph)
      maybeLine = Maybe.map2 Line maybeFrom maybeTo
  in
      Maybe.map (EncodedEdge tLine) maybeLine


encodeGraph : Graph NodeLabel String -> (List (Node Json.Value), List EncodedEdge)
encodeGraph graph =
  let
      encodedNodes = List.map encodeNode <| Graph.nodes graph
      tLines = List.filterMap (encodeEdge graph) <| Graph.edges graph
  in
      (encodedNodes, tLines)
