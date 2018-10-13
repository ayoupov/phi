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


type alias Water =
    Float


type alias Latitude =
    Float


type alias Longitude =
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
    = GeneratorNode WaterPurificator
    | HousingNode Housing
    | ResilientHousingNode ResilientHousing
    | PotentialNode Potential
    | BatNode Battery


type alias Potential =
    { nodeType : PotentialNodeType
    , pos : Coords
    }


type PotentialNodeType
    = PotentialHousing
    | PotentialResilientHousing
    | PotentialWPS



-- NODES


type alias WaterPurificator =
    { dailyGeneration : List Water
    , maxGeneration : Water
    , pos : Coords
    }


defaultGenerator : WaterPurificator
defaultGenerator =
    { dailyGeneration = [ 0 ]
    , maxGeneration = 0.7
    , pos = { x = 0, y = 0 }
    }


type alias Battery =
    { capacity : Water
    , storage : Water
    , pos : Coords
    }


type alias HousingWater =
    { storedWater : List Water
    , actualConsumption : List Water
    , desiredConsumption : Water
    , seedRatingWater : List Water
    , tradeBalance : List Water
    }


defaultHousingWater : HousingWater
defaultHousingWater =
    HousingWater [ 0 ] [ 0 ] 0.8 [ 0 ] [ 0 ]


type alias Housing =
    { water : HousingWater
    , reputation : List ReputationRating
    , pos : Coords
    }

defaultHousing : Housing
defaultHousing =
    { water = defaultHousingWater
    , reputation = [ 0 ]
    , pos = { x = 0, y = 0 }
    }

type alias ResilientHousing =
    { water : HousingWater
    , reputation : List ReputationRating
    , dailyGeneration : List Water
    , maxGeneration : Water
    , pos : Coords
    }

defaultResilientHousing : ResilientHousing
defaultResilientHousing =
    { water = defaultHousingWater
    , reputation = [ 0 ]
    , dailyGeneration =  [ 0 ]
    , maxGeneration = 0.7
    , pos = { x = 0, y = 0 }
    }


-- WEATHER


type alias Weather =
    { water : Float
    , wind : Float
    }


type alias WeatherTuple =
    ( Float, Float )
