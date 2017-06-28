module Simulation.Model exposing (..)

import Graph exposing (Edge, Graph, Node)
import Json.Encode as Json


-- GEOMETRY


type alias Coords =
    { x : Longitude, y : Latitude }


type alias Line =
    { from : Coords
    , to : Coords
    }


type alias SearchRadius =
    Float



-- VARIABLES


type alias KWHour =
    Float


type alias Latitude =
    Float


type alias Longitude =
    Float


type alias Negawatts =
    Float


type alias ReputationRating =
    Float


type alias Phicoin =
    Float



-- a and b quotients ~> a = ratio, b = 1 - ratio


type alias ReputationRatio =
    { a : Float
    , b : Float
    }


type alias MapLimit =
    Float



-- Game settings


type alias NarrativeItem =
    { event : String
    , message : String
    }


type alias Narrative =
    List NarrativeItem


type alias Budget =
    List Phicoin


type alias SiteInfo =
    { name : String
    , population : Int
    }

type alias Stats =
    { health : Float
    , coverage : Float
    }

type alias SimMap =
    { name : String
    , population : Int
    , initialNetwork : PhiNetwork
    , initialWeather : Weather
    , initialWeatherList : List WeatherTuple
    , narrative : Narrative
    , initialBudget : Budget
    , initialReputationRatio : ReputationRatio
    , initialNegawattLimit : MapLimit
    , initialStats : List Stats
    }


tupleToCoords : ( Int, Int ) -> Coords
tupleToCoords ( x, y ) =
    { x = toFloat x, y = toFloat y }



-- Graph


type alias PhiNetwork =
    Graph NodeLabel String


type alias TransmissionLine =
    Edge String


type alias EncodedEdge =
    { transmissionLine : TransmissionLine
    , pos : Line
    }


type NodeLabel
    = GeneratorNode SimGenerator
    | PeerNode Peer
    | PotentialNode Potential
    | BatNode Battery


type alias Potential =
    { nodeType : PotentialNodeType
    , pos : Coords
    }


type PotentialNodeType
    = PotentialPeer
    | PotentialSolarPanel
    | PotentialWindTurbine



-- NODES


type GeneratorType
    = WindTurbine
    | SolarPanel


type alias SimGenerator =
    { dailyGeneration : List KWHour
    , maxGeneration : KWHour
    , pos : Coords
    , generatorType : GeneratorType
    }


defaultGenerator : SimGenerator
defaultGenerator =
    { dailyGeneration = [ 0 ]
    , maxGeneration = 0.7
    , pos = { x = 0, y = 0 }
    , generatorType = SolarPanel
    }


type alias Battery =
    { capacity : KWHour
    , storage : KWHour
    , pos : Coords
    }


type alias PeerJoules =
    { storedJoules : List KWHour
    , actualConsumption : List KWHour
    , desiredConsumption : KWHour
    , seedRatingJoules : List KWHour
    , tradeBalance : List KWHour
    }


defaultPeerJoules : PeerJoules
defaultPeerJoules =
    PeerJoules [ 0 ] [ 0 ] 0.8 [ 0 ] [ 0 ]


type alias Peer =
    { joules : PeerJoules
    , negawatts : List Negawatts
    , reputation : List ReputationRating
    , pos : Coords
    }


defaultPeer : Peer
defaultPeer =
    { joules = defaultPeerJoules
    , negawatts = [ 0 ]
    , reputation = [ 0 ]
    , pos = { x = 0, y = 0 }
    }



-- WEATHER


type alias Weather =
    { sun : Float
    , wind : Float
    }


type alias WeatherTuple =
    ( Float, Float )
