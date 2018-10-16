module Model exposing (..)

import Action exposing (Msg(..))
import Chat.Model exposing (ChatItem, MultiChoiceAction(..), initChat)
import Chat.Narrative exposing (introNarrative, processNarrative)
import Graph
import Material
import Set exposing (Set)
import Simulation.GraphUpdates exposing (graphFromNodeList, potentialNodesList)
import Simulation.Init.Generators as Generators
import Simulation.Model exposing (Budget, MapLimit, Narrative, NarrativeItem, PhiNetwork, ReputationRatio, SimMap, SiteInfo, Stats, Weather, WeatherTuple, tupleToCoords)
import Simulation.NodeList exposing (initialHousing, initialWPS)
import Simulation.WeatherList exposing (restWeather)


type alias Model =
    { input : String
    , mcaList : List MultiChoiceAction
    , inputAvailable : Bool
    , messages : List ChatItem
    , cycleCount : Int
    , network : PhiNetwork
    , weather : Weather
    , weatherList : List WeatherTuple
    , siteInfo : SiteInfo
    , budget : Budget
    , reputationRatio : ReputationRatio
    , stats : List Stats
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
        [ McaIntro1, McaSkipIntro ]
        True
        []
        0
        (initGraph map)
        (initWeather map)
        (initWeatherList map)
        (initSiteInfo map)
        (initBudget map)
        (initReputation map)
        (initStats map)
        Material.model
        ! [ processNarrative introNarrative ]


initSiteInfo : SimMap -> SiteInfo
initSiteInfo map =
    { name = map.name
    , population = map.population
    }


defaultStats =
    { health = 0, coverage = 0 }


initMap : SimMap
initMap =
    { name = ""
    , population = 0
    , initialNetwork = graphFromNodeList potentialNodesList
    , initialWeather =
        { water = 0.5
        , floodLevel = 0
        }
    , initialWeatherList = restWeather []
    , narrative = initNarrative
    , initialBudget = []
    , initialReputationRatio = { a = 0.7, b = 0.3 }
    , initialStats = [ defaultStats ]
    }


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

initStats : SimMap -> List Stats
initStats map =
    map.initialStats


initNetworkGenerators : List (Cmd Msg)
initNetworkGenerators =
    let
        edgeSearchRadius =
            0

        asCoordsList =
            List.map tupleToCoords << Set.toList
    in
    (List.map (Generators.generateHousing <| AddHousingWithEdges edgeSearchRadius) <| asCoordsList initialHousing)
--        ++ (List.map (Generators.generateRH <| AddGeneratorWithEdges edgeSearchRadius) <| asCoordsList initialSolarPanelList)
        ++ (List.map (Generators.generateWPS <| AddGeneratorWithEdges edgeSearchRadius) <| asCoordsList initialWPS)
