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
--  , transmissionLines: List TransmissionLine
  }

type alias KWHour = Float
type alias Latitude = Float
type alias Longitude = Float

type alias PVPanel =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , y: Latitude
  , x: Longitude
  }

type alias WindTurbine =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , y: Latitude
  , x: Longitude
  }

type alias Battery =
  { capacity: KWHour
  , storage: KWHour
  , y: Latitude
  , x: Longitude
  }

type alias Residence =
  { dailyConsumption: KWHour
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
  ( Model [] [] [] []
  , (List.repeat 5 randomResidence)
    ++ (List.repeat 10 randomPVPanel)
    ++ (List.repeat 10 randomWindTurbine)
    |> Cmd.batch
  )

randomPVPanel : Cmd Msg
randomPVPanel =
  Random.map4 PVPanel
    (Random.float 7 10) -- maxGeneration
    (Random.float 0 1) -- percent generated
    (Random.float 0 300) -- latitude
    (Random.float 0 600) -- longitude
  |> Random.generate AddPVPanel

randomWindTurbine : Cmd Msg
randomWindTurbine =
  Random.map4 WindTurbine
    (Random.float 7 10) -- capacity
    (Random.float 0 1) -- current storage
    (Random.float (50.4501 - 0.01) (50.4501 + 0.01)) -- latitude
    (Random.float (30.5234 - 0.01) (30.5234 + 0.01)) -- longitude
  |> Random.generate AddWindTurbine

randomResidence : Cmd Msg
randomResidence =
  Random.map3 Residence
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
    AddPVPanel pvPanel ->
      let
        newModel = { model | pvPanels = ( pvPanel :: model.pvPanels ) }
      in
        (newModel, renderNetwork newModel)
    AddWindTurbine windTurbine ->
      let
        newModel = { model | windTurbines = ( windTurbine :: model.windTurbines ) }
      in
        (newModel, renderNetwork newModel)
    AddResidence residence ->
      let
        newModel = { model | residences = ( residence :: model.residences ) }
      in
        (newModel, renderNetwork newModel)
    RenderNetwork ->
      ( model
      , renderNetwork model
      )

-- PORTS

port renderNetwork : Model -> Cmd msg


-- VIEW

view : Model -> Html Msg
view model = div [class "simulation"] [svg []]
