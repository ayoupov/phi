module Model exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (ChatItem, initChat)
import Graph
import Simulation.Model exposing (Budget, Narrative, NarrativeItem, PhiNetwork, ReputationRatio, SimMap, Weather)
import Simulation.Simulation as Simulation


type alias Model =
    { input : String
    , messages : List ChatItem
    , network : PhiNetwork
    , weather : Weather
    , budget : Budget
    , reputationRatio : ReputationRatio
    }


initModel : ( Model, Cmd Msg )
initModel =
    let
        map : SimMap
        map =
            initMap
    in
    Model ""
        [ initChat ]
        (initGraph map)
        (initWeather map)
        (initBudget map)
        (initReputation map)
        ! initGenerators



-- less hardcode??


initMap : SimMap
initMap =
    SimMap "first" Graph.empty (Weather 0.8 0.4) initNarrative 10000


initGraph : SimMap -> PhiNetwork
initGraph map =
    map.initialNetwork


initWeather : SimMap -> Weather
initWeather map =
    Weather map.initialWeather.sun map.initialWeather.wind


initBudget : SimMap -> Budget
initBudget map =
    map.initialBudget


initNarrative : Narrative
initNarrative =
    [ NarrativeItem "start" "hi!" ]

initReputation : SimMap -> ReputationRatio
initReputation map =
    map.initialReputationRatio

initGenerators : List (Cmd Msg)
initGenerators =
    List.repeat 20 Simulation.generateEdge
        ++ List.repeat 10 Simulation.generatePeer
        ++ List.repeat 30 Simulation.generatePVPanel
        ++ List.repeat 5 Simulation.generateWindTurbine
