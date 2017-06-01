port module Simulation exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Random exposing (..)
import List exposing (repeat)
import Svg exposing (..)
import Graph exposing (..)

-- TODO: move the model to be
-- based off a graph representation, and everything
-- else should be derived from that graph representation
-- uid's should be gerated from the graph library, and no
-- stupid magic from me
type alias Model =
  { pvPanels: List PVPanel
  , windTurbines: List WindTurbine
  , batteries: List Battery
  , residences: List Residence
  , transmissionLines: List TransmissionLine
  , maxId: Int
  }

type alias KWHour = Float
type alias Latitude = Float
type alias Longitude = Float

type alias PVPanel =
  { uid: Int
  , maxGeneration: KWHour
  , generatedEnergy: KWHour
  , pos: Coords
  }

type alias WindTurbine =
  { uid: Int
  , maxGeneration: KWHour
  , generatedEnergy: KWHour
  , pos: Coords
  }

type alias Battery =
  { uid: Int
  , capacity: KWHour
  , storage: KWHour
  , pos: Coords
  }

type alias Residence =
  { uid: Int
  , dailyConsumption: KWHour
  , pos: Coords
  }

type alias PortableGraph =
  { nodes: List NodeLabel
  , edges: List NetworkEdge
  }

type alias NetworkEdge =
  { transmissionLine: TransmissionLine
  , pos: Line
  }

type alias Coords = { x: Longitude, y: Latitude }

getPos : NodeLabel -> Coords
getPos nodeLabel =
  case nodeLabel of
    PVNode pvPanel -> pvPanel.pos
    WTNode windTurbine -> windTurbine.pos
    BatNode battery -> battery.pos
    ResNode residence -> residence.pos


type alias TransmissionLine = Edge String

type NodeLabel = PVNode PVPanel
               | WTNode WindTurbine
               | ResNode Residence
               | BatNode Battery

-- this likely will all go away when the
-- graph library is the main store, also
-- when making use of fromNodeLabelsAndEdgePairs
-- (but maybe this isn't needed at all if the
-- graph is built iteratively)
toNode : NodeLabel -> Node NodeLabel
toNode nodeLabel =
  case nodeLabel of
    PVNode  pvPanel -> Node pvPanel.uid nodeLabel
    WTNode  wtNode  -> Node wtNode.uid  nodeLabel
    ResNode resNode -> Node resNode.uid nodeLabel
    BatNode batNode -> Node batNode.uid nodeLabel

-- code to kill
graph : Model -> Graph NodeLabel String
graph model = 
  (  ( List.map (toNode << PVNode)  model.pvPanels     )
  ++ ( List.map (toNode << WTNode)  model.windTurbines )
  ++ ( List.map (toNode << ResNode) model.residences   )
  |> Graph.fromNodesAndEdges ) <| []

type alias Line =
  { from: Coords
  , to: Coords
  }

edgeWithCoords : Graph NodeLabel String -> TransmissionLine -> Maybe NetworkEdge
edgeWithCoords graph tLine =
  let
      maybeFrom = Maybe.map (getPos << .label << .node) (Graph.get tLine.from graph)
      maybeTo = Maybe.map (getPos << .label << .node) (Graph.get tLine.to graph)
      maybeLine = Maybe.map2 Line maybeFrom maybeTo
  in
      Maybe.map (NetworkEdge tLine) maybeLine

modelAndEdgeCoords : Model -> (Model, List NetworkEdge)
modelAndEdgeCoords model =
  let
      simGraph = graph model
      tLines = List.filterMap (edgeWithCoords simGraph) model.transmissionLines
  in
      (model, tLines)

initEdges : List TransmissionLine
initEdges =
  [ Edge 1 2 ""
  , Edge 3 5 ""
  , Edge 3 10 ""
  , Edge 4 8 ""
  , Edge 5 8 ""
  , Edge 9 8 ""
  , Edge 9 5 ""
  , Edge 2 5 ""
  ]

init : (Model, Cmd Msg)
init =
  ( Model [] [] [] [] [] 0
  , (List.repeat 5 randomResidence)
    ++ (List.repeat 10 randomPVPanel)
    ++ (List.repeat 30 randomWindTurbine)
    ++ (List.repeat 200 randomEdge)
    |> Cmd.batch
  )

coordsGenerator : Generator Coords
coordsGenerator =
  Random.map2 Coords
    ( Random.float (30.5234 - 0.01) (30.5234 + 0.01) ) -- longitude
    ( Random.float (50.4501 - 0.01) (50.4501 + 0.01) ) -- latitude

randomPVPanel : Cmd Msg
randomPVPanel =
  Random.map3 (PVPanel -1)
    (Random.float 7 10) -- maxGeneration
    (Random.float 0 1) -- percent generated
    coordsGenerator
  |> Random.generate AddPVPanel

randomEdge : Cmd Msg
randomEdge =
  Random.map2 Edge
    (Random.int 0 45)
    (Random.int 0 45)
  |> Random.generate (AddEdge << ((|>) ""))


randomWindTurbine : Cmd Msg
randomWindTurbine =
  Random.map3 (WindTurbine -1)
    (Random.float 7 10) -- capacity
    (Random.float 0 1) -- current storage
    coordsGenerator
  |> Random.generate AddWindTurbine

randomResidence : Cmd Msg
randomResidence =
  Random.map2 (Residence -1)
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
      let
        nodeWithId = { node | uid = model.maxId + 1 }
        newModel = { model | pvPanels = ( nodeWithId :: model.pvPanels )
                           , maxId = model.maxId + 1
                   }
      in
        update RenderNetwork newModel
    AddWindTurbine node ->
      let
        nodeWithId = { node | uid = model.maxId + 1 }
        newModel = { model | windTurbines = ( nodeWithId :: model.windTurbines )
                           , maxId = model.maxId + 1
                   }
      in
        update RenderNetwork newModel
    AddResidence node ->
      let
        nodeWithId = { node | uid = model.maxId + 1 }
        newModel = { model | residences = ( nodeWithId :: model.residences )
                           , maxId = model.maxId + 1
                   }
      in
        update RenderNetwork newModel
    AddEdge edge ->
      update RenderNetwork { model | transmissionLines = ( edge :: model.transmissionLines ) }
    RenderNetwork ->
      (model, renderNetwork <| modelAndEdgeCoords model )

-- PORTS



port renderNetwork : (Model, List NetworkEdge) -> Cmd msg

-- VIEW

view : Model -> Html Msg
view model = div [class "simulation"] [svg [] []]
