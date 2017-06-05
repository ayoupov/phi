module Simulation.Types exposing (..)

import Graph exposing (Graph, Edge, Node)

-- GEOMETRY
type alias Coords = { x: Longitude, y: Latitude }

type alias Line =
  { from: Coords
  , to: Coords
  }

-- VARIABLES
type alias KWHour = Float
type alias Latitude = Float
type alias Longitude = Float
type alias Negawatts = Float
type alias SeedRating = Float
type alias Phicoin = Float


-- NODES

type NodeLabel = PVNode PVPanel
               | WTNode WindTurbine
               | ResNode Residence
               | BatNode Battery

type alias NetworkNode =
  { joules: KWHour
  , negawatts: Negawatts
  , seedRating: SeedRating
  , phicoin: Phicoin
  , pos: Coords
  , nodeType: NodeLabel
  }

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

-- EDGES

type alias TransmissionLine = Edge String

type alias EncodedEdge =
  { transmissionLine: TransmissionLine
  , pos: Line
  }


-- WEATHER

type alias Weather =
  { sun: Float
  , wind: Float
  }

