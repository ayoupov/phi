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
  { network: Graph NodeLabel String
  , weather: Weather
  }

initWeather : Weather
initWeather = Weather 0.8 0.4

init : (Model, Cmd Msg)
init =
  ( Model Graph.empty initWeather
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
      update RenderNetwork { model | network = addNode (PVNode node) model.network }
    AddWindTurbine node ->
      update RenderNetwork { model | network = addNode (WTNode node) model.network }
    AddResidence node ->
      update RenderNetwork { model | network = addNode (ResNode node) model.network }
    AddEdge edge ->
      update RenderNetwork { model | network = addEdge edge model.network }
    RenderNetwork ->
      (model, renderNetwork <| encodeGraph model.network )

addNode : NodeLabel -> Graph NodeLabel e -> Graph NodeLabel e
addNode nodeLabel network =
  let
    nodeId =
      Maybe.withDefault 0
      <| Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange network)
    node = Node nodeId nodeLabel
  in
    Graph.insert (NodeContext node IntDict.empty IntDict.empty) network

addEdge : TransmissionLine -> Graph n String -> Graph n String
addEdge edge network =
    Graph.fromNodesAndEdges (Graph.nodes network) (edge :: (Graph.edges network))

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
