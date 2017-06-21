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
    }



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
    | BatNode Battery



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


type alias Peer =
    { joules : PeerJoules
    , negawatts : List Negawatts
    , reputation : List ReputationRating
    , pos : Coords
    }



-- WEATHER


type alias Weather =
    { sun : Float
    , wind : Float
    }

type alias WeatherTuple =
    (Float, Float)
