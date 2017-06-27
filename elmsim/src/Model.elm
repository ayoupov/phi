module Model exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (ChatItem, InputType(..), initChat)
import Graph
import Material
import Simulation.Init.Generators as Generators
import Simulation.Model exposing (Budget, MapLimit, Narrative, NarrativeItem, PhiNetwork, ReputationRatio, SimMap, SiteInfo, Weather, WeatherTuple)
import Simulation.WeatherList exposing (restWeather)


type alias Model =
    { input : String
    , inputType : InputType
    , messages : List ChatItem
    , network : PhiNetwork
    , weather : Weather
    , weatherList : List WeatherTuple
    , siteInfo : SiteInfo
    , budget : Budget
    , reputationRatio : ReputationRatio
    , negawattLimit : MapLimit
    , mdl : Material.Model
    }


initModel : ( Model, Cmd Msg )
initModel =
    let
        map : SimMap
        map =
            initMap
    in
    Model ""
        FreeTextInput
        [ initChat ]
        (initGraph map)
        (initWeather map)
        (initWeatherList map)
        (initSiteInfo map)
        (initBudget map)
        (initReputation map)
        (initNegawattLimit map)
        Material.model
        ! initGenerators


initSiteInfo : SimMap -> SiteInfo
initSiteInfo map =
    { name = map.name
    , population = map.population
    }



-- less hardcode??


initMap : SimMap
initMap =
    SimMap "Kolionovo" 5523 Graph.empty { sun = 0.5, wind = 0.5 } (restWeather []) initNarrative [ 10000 ] { a = 1, b = 0 } 21


initGraph : SimMap -> PhiNetwork
initGraph map =
    map.initialNetwork


initWeather : SimMap -> Weather
initWeather map =
    map.initialWeather


initWeatherList : SimMap -> List WeatherTuple
initWeatherList map =
    map.initialWeatherList


initBudget : SimMap -> Budget
initBudget map =
    map.initialBudget


initNarrative : Narrative
initNarrative =
    [ NarrativeItem "start" "hi!" ]


initReputation : SimMap -> ReputationRatio
initReputation map =
    map.initialReputationRatio


initNegawattLimit : SimMap -> MapLimit
initNegawattLimit map =
    map.initialNegawattLimit


initGenerators : List (Cmd Msg)
initGenerators =
    List.repeat 12 Generators.generateEdge
        ++ List.repeat 5 Generators.generatePeer
        ++ List.repeat 2 Generators.generatePVPanel
        ++ List.repeat 2 Generators.generateWindTurbine
