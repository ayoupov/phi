port module Simulation.Simulation exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Random exposing (..)
import List exposing (repeat)
import Svg exposing (..)
import Svg.Attributes as SVG
import Graph exposing (..)
import IntDict
import Simulation.Encoder exposing (encodeGraph)
import Simulation.Types exposing (..)
import Json.Encode as Json


type alias Model =
  { graph: Graph NodeLabel String }


init : (Model, Cmd Msg)
init =
  ( Model Graph.empty
  , (List.repeat 20 randomEdge)
    ++ (List.repeat 30 randomResidence)
    ++ (List.repeat 10 randomPVPanel)
    ++ (List.repeat 10 randomWindTurbine)
    |> Cmd.batch
  )

coordsGenerator : Generator Coords
coordsGenerator =
  Random.map2 Coords
    ( Random.float (30.5234 - 0.01) (30.5234 + 0.01) ) -- longitude
    ( Random.float (50.4501 - 0.01) (50.4501 + 0.01) ) -- latitude

randomPVPanel : Cmd Msg
randomPVPanel =
  Random.map3 PVPanel
    (Random.float 7 10) -- maxGeneration
    (Random.float 0 1) -- percent generated
    coordsGenerator
  |> Random.generate AddPVPanel

randomEdge : Cmd Msg
randomEdge =
  Random.map2 Edge
    (Random.int 0 49)
    (Random.int 0 49)
  |> Random.generate (AddEdge << ((|>) ""))


randomWindTurbine : Cmd Msg
randomWindTurbine =
  Random.map3 WindTurbine
    (Random.float 7 10) -- capacity
    (Random.float 0 1) -- current storage
    coordsGenerator
  |> Random.generate AddWindTurbine

randomResidence : Cmd Msg
randomResidence =
  Random.map2 Residence
    (Random.float 7 10) -- daily consumption
    coordsGenerator
  |> Random.generate AddResidence

addNRandomPVPanels : Int -> Cmd Msg
addNRandomPVPanels n =
  List.repeat n randomPVPanel
  |> Cmd.batch


-- UPDATE
type Msg = AddPVPanel PVPanel
         | AddWindTurbine WindTurbine
         | AddResidence Residence
         | AddEdge TransmissionLine
         | RenderNetwork

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    AddPVPanel node ->
      update RenderNetwork { model | graph = addNode (PVNode node) model.graph }
    AddWindTurbine node ->
      update RenderNetwork { model | graph = addNode (WTNode node) model.graph }
    AddResidence node ->
      update RenderNetwork { model | graph = addNode (ResNode node) model.graph }
    AddEdge edge ->
      update RenderNetwork { model | graph = addEdge edge model.graph }
    RenderNetwork ->
      (model, renderNetwork <| encodeGraph model.graph )

addNode : NodeLabel -> Graph NodeLabel e -> Graph NodeLabel e
addNode nodeLabel graph =
  let
    nodeId =
      Maybe.withDefault 0
      <| Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange graph)
    node = Node nodeId nodeLabel
  in
    Graph.insert (NodeContext node IntDict.empty IntDict.empty) graph

addEdge : TransmissionLine -> Graph n String -> Graph n String
addEdge edge graph =
    Graph.fromNodesAndEdges (Graph.nodes graph) (edge :: (Graph.edges graph))

-- PORTS

port renderNetwork : (List (Node Json.Value), List EncodedEdge) -> Cmd msg

-- VIEW

view : Model -> Html Msg
view model =
  div [class "simulation"]
    [ svg []
        [ g [SVG.class "links"] []
        , g [SVG.class "nodes"] []
        ]
    ]
