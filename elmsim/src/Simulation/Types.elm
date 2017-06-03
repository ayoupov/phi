module Simulation.Types exposing (..)

import Graph exposing (Graph, Edge, Node)

type NodeLabel = PVNode PVPanel
               | WTNode WindTurbine
               | ResNode Residence
               | BatNode Battery

type alias Coords = { x: Longitude, y: Latitude }

type alias KWHour = Float
type alias Latitude = Float
type alias Longitude = Float

type alias PVPanel =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , pos: Coords
  }

type alias WindTurbine =
  { maxGeneration: KWHour
  , generatedEnergy: KWHour
  , pos: Coords
  }

type alias Battery =
  { capacity: KWHour
  , storage: KWHour
  , pos: Coords
  }

type alias Residence =
  { dailyConsumption: KWHour
  , pos: Coords
  }

type alias EncodedEdge =
  { transmissionLine: TransmissionLine
  , pos: Line
  }

type alias TransmissionLine = Edge String

type alias Line =
  { from: Coords
  , to: Coords
  }
