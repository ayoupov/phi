port module Simulation exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Random exposing (..)
import List exposing (repeat)
import Svg exposing (..)

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
  , y: Latitude
  , x: Longitude
  }

type alias WindTurbine =
  { uid: Int
  , maxGeneration: KWHour
  , generatedEnergy: KWHour
  , y: Latitude
  , x: Longitude
  }

type alias Battery =
  { uid: Int
  , capacity: KWHour
  , storage: KWHour
  , y: Latitude
  , x: Longitude
  }

type alias Residence =
  { uid: Int
  , dailyConsumption: KWHour
  , y: Latitude
  , x: Longitude
  }

type Node = NodePV PVPanel
          | NodeWT WindTurbine
          | NodeR Residence
          | NodeB Battery

type alias TransmissionLine =
  { nodeA: Node
  , nodeB: Node
  }

init : (Model, Cmd Msg)
init =
  ( Model [] [] [] [] 0
  , (List.repeat 5 randomResidence)
    ++ (List.repeat 10 randomPVPanel)
    ++ (List.repeat 10 randomWindTurbine)
    |> Cmd.batch
  )

randomPVPanel : Cmd Msg
randomPVPanel =
  Random.map4 (PVPanel -1)
    (Random.float 7 10) -- maxGeneration
    (Random.float 0 1) -- percent generated
    (Random.float (50.4501 - 0.01) (50.4501 + 0.01)) -- latitude
    (Random.float (30.5234 - 0.01) (30.5234 + 0.01)) -- longitude
  |> Random.generate AddPVPanel

randomWindTurbine : Cmd Msg
randomWindTurbine =
  Random.map4 (WindTurbine -1)
    (Random.float 7 10) -- capacity
    (Random.float 0 1) -- current storage
    (Random.float (50.4501 - 0.01) (50.4501 + 0.01)) -- latitude
    (Random.float (30.5234 - 0.01) (30.5234 + 0.01)) -- longitude
  |> Random.generate AddWindTurbine

randomResidence : Cmd Msg
randomResidence =
  Random.map3 (Residence -1)
    (Random.float 7 10) -- daily consumption
    (Random.float (50.4501 - 0.01) (50.4501 + 0.01)) -- latitude
    (Random.float (30.5234 - 0.01) (30.5234 + 0.01)) -- longitude
  |> Random.generate AddResidence

addNRandomPVPanels : Int -> Cmd Msg
addNRandomPVPanels n =
  List.repeat n randomPVPanel
  |> Cmd.batch


-- UPDATE
type Msg = AddPVPanel PVPanel
         | AddWindTurbine WindTurbine
         | AddResidence Residence
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
        (newModel, renderNetwork newModel)
    AddWindTurbine node ->
      let
        nodeWithId = { node | uid = model.maxId + 1 }
        newModel = { model | windTurbines = ( nodeWithId :: model.windTurbines )
                           , maxId = model.maxId + 1
                   }
      in
        (newModel, renderNetwork newModel)
    AddResidence node ->
      let
        nodeWithId = { node | uid = model.maxId + 1 }
        newModel = { model | residences = ( nodeWithId :: model.residences )
                           , maxId = model.maxId + 1
                   }
      in
        (newModel, renderNetwork newModel)
    RenderNetwork ->
      ( model
      , renderNetwork model
      )


renderableModel : Model -> RenderableModel
renderableModel model = 
  { model | 

-- PORTS

port renderNetwork : Model -> Cmd msg


-- VIEW

view : Model -> Html Msg
view model = div [class "simulation"] [svg [] []]
