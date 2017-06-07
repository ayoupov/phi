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

-- Graph

type alias PhiNetwork = Graph NodeLabel String

type alias TransmissionLine = Edge String

type alias EncodedEdge =
  { transmissionLine: TransmissionLine
  , pos: Line
  }

type NodeLabel = PVNode PVPanel
               | WTNode WindTurbine
               | PeerNode Peer
               | BatNode Battery
-- NODES

type alias EncodedNodes =
  { pvPanels: List (Node PVPanel)
  , windTurbines: List (Node WindTurbine)
  , peers: List (Node Peer)
  }

type alias PhiNode =
  { joules: KWHour
  , negawatts: Negawatts
  , seedRating: SeedRating
  , phicoin: Phicoin
  , pos: Coords
  , nodeType: NodeLabel
  }

type alias PVPanel =
  { dailyGeneration: List KWHour
  , maxGeneration: KWHour
  , pos: Coords
  }

type alias WindTurbine =
  { dailyGeneration: List KWHour
  , maxGeneration: KWHour
  , pos: Coords
  }

type alias Battery =
  { capacity: KWHour
  , storage: KWHour
  , pos: Coords
  }

type alias Peer =
  { joules: List KWHour
  , dailyConsumption: List KWHour
  , desiredConsumption: KWHour
  , pos: Coords
  }


-- WEATHER

type alias Weather =
  { sun: Float
  , wind: Float
  }

