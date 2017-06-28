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
import Simulation.NodeList exposing (initialPeerList, initialSolarPanelList, initialWindTurbineList)
import Simulation.WeatherList exposing (restWeather)


type alias Model =
    { input : String
    , mcaList : List MultiChoiceAction
    , inputAvailable : Bool
    , messages : List ChatItem
    , network : PhiNetwork
    , weather : Weather
    , weatherList : List WeatherTuple
    , siteInfo : SiteInfo
    , budget : Budget
    , reputationRatio : ReputationRatio
    , negawattLimit : MapLimit
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
        [ McaIntro1, McaIntro2, McaSkipIntro ]
        True
        []
        (initGraph map)
        (initWeather map)
        (initWeatherList map)
        (initSiteInfo map)
        (initBudget map)
        (initReputation map)
        (initNegawattLimit map)
        (initStats map)
        Material.model
        ! (processNarrative introNarrative :: initGenerators)


initSiteInfo : SimMap -> SiteInfo
initSiteInfo map =
    { name = map.name
    , population = map.population
    }

defaultStats = { health = 0, coverage = 0.15}

-- less hardcode??

initMap : SimMap
initMap =
    { name = "Kolionovo"
    , population = 5523
    , initialNetwork = graphFromNodeList potentialNodesList
    , initialWeather =
        { sun = 0.5
        , wind = 0.5
        }
    , initialWeatherList = restWeather []
    , narrative = initNarrative
    , initialBudget = [ 10000 ]
    , initialReputationRatio = { a = 1, b = 0 }
    , initialNegawattLimit = 21
    , initialStats = [defaultStats]
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


initNegawattLimit : SimMap -> MapLimit
initNegawattLimit map =
    map.initialNegawattLimit

initStats : SimMap -> List Stats
initStats map =
    map.initialStats


initGenerators : List (Cmd Msg)
initGenerators =
    let
        edgeSearchRadius =
            70

        asCoordsList =
            List.map tupleToCoords << Set.toList
    in
    (List.map (Generators.generatePeer <| AddPeerWithEdges edgeSearchRadius) <| asCoordsList initialPeerList)
        ++ (List.map (Generators.generatePVPanel <| AddGeneratorWithEdges edgeSearchRadius) <| asCoordsList initialSolarPanelList)
        ++ (List.map (Generators.generateWindTurbine <| AddGeneratorWithEdges edgeSearchRadius) <| asCoordsList initialWindTurbineList)
