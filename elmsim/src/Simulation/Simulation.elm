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
  { network: PhiNetwork
  , weather: Weather
  }

initWeather : Weather
initWeather = Weather 0.8 0.4

init : (Model, Cmd Msg)
init =
  ( Model Graph.empty initWeather
  , (List.repeat 20 randomEdge)
    ++ (List.repeat 30 randomPeer)
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
  Random.map2 (PVPanel [])
    (Random.float 7 10) -- maxGeneration
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
  Random.map2 (WindTurbine [])
    (Random.float 7 10) -- capacity
    coordsGenerator
  |> Random.generate AddWindTurbine

randomPeer : Cmd Msg
randomPeer =
  Random.map2 (Peer [] [])
    (Random.float 7 10) -- consumptionDesire
    coordsGenerator
  |> Random.generate AddPeer


-- UPDATE
type Msg = AddPVPanel PVPanel
         | AddWindTurbine WindTurbine
         | AddPeer Peer
         | AddEdge TransmissionLine
         | RenderPhiNetwork

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    AddPVPanel node ->
      update RenderPhiNetwork { model | network = addNode (PVNode node) model.network }
    AddWindTurbine node ->
      update RenderPhiNetwork { model | network = addNode (WTNode node) model.network }
    AddPeer node ->
      update RenderPhiNetwork { model | network = addNode (PeerNode node) model.network }
    AddEdge edge ->
      update RenderPhiNetwork { model | network = addEdge edge model.network }
    RenderPhiNetwork ->
      (model, renderPhiNetwork <| encodeGraph model.network )

addNode : NodeLabel -> PhiNetwork -> PhiNetwork
addNode nodeLabel network =
  let
    nodeId =
      Maybe.withDefault 0
      <| Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange network)
    node = Node nodeId nodeLabel
  in
    Graph.insert (NodeContext node IntDict.empty IntDict.empty) network

addEdge : TransmissionLine -> PhiNetwork -> PhiNetwork
addEdge edge network =
    Graph.fromNodesAndEdges (Graph.nodes network) (edge :: (Graph.edges network))

joulesToGenerators : Weather -> PhiNetwork -> PhiNetwork
joulesToGenerators weather network =
  let
    sun = weather.sun
    wind = weather.wind
    newDailyGeneration node weatherFactor =
      ( node.maxGeneration
        * weatherFactor
      ) :: node.dailyGeneration
    updateNode node =
      case node of
        PVNode node ->
          PVNode { node | dailyGeneration = newDailyGeneration node sun }
        WTNode node ->
          WTNode { node | dailyGeneration = newDailyGeneration node wind }
        _ -> node
  in
    Graph.mapNodes updateNode network

toPeer : Node NodeLabel -> Maybe Peer
toPeer {label,id} =
  case label of
    PeerNode peer -> Just peer
    _ -> Nothing


distributeGeneratedJoules : PhiNetwork -> PhiNetwork
distributeGeneratedJoules network =
  let
    nodeGeneratedEnergy {label, id} =
      case label of
        PVNode node -> List.head node.dailyGeneration
        WTNode node -> List.head node.dailyGeneration
        _ -> Nothing
    networkGeneratedEnergy =
      Graph.nodes network
      |> List.filterMap nodeGeneratedEnergy
      |> List.sum
    networkDesiredEnergy =
      Graph.nodes network
      |> List.filterMap ( toPeer >> (Maybe.map .desiredConsumption) )
      |> List.sum
    newConsumption node =
      ( node.desiredConsumption
        * networkGeneratedEnergy
        / networkDesiredEnergy
      ) :: node.dailyConsumption
    updateNode node =
      case node of
        PeerNode n ->
          PeerNode { n | dailyConsumption = newConsumption n }
        _ -> node
  in
    Graph.mapNodes updateNode network
--generatedEnergy : Model -> KWHour
--generatedEnergy model =
--  let
--      List.filterMap
--  List.map Graph.nodes model.graph


-- PORTS

port renderPhiNetwork : (List (Node Json.Value), List EncodedEdge) -> Cmd msg

-- VIEW

view : Model -> Html Msg
view model =
  div [class "simulation"]
    [ svg []
        [ g [SVG.class "links"] []
        , g [SVG.class "nodes"] []
        ]
    ]


