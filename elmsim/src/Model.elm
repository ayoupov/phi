module Model exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (ChatItem, InputType(..), initChat)
import Graph
import Material
import Simulation.Init.Generators as Generators
import Simulation.Model exposing (Budget, MapLimit, Narrative, NarrativeItem, PhiNetwork, ReputationRatio, SimMap, Weather)


type alias Model =
    { input : String
    , inputType : InputType
    , messages : List ChatItem
    , network : PhiNetwork
    , weather : Weather
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
        (initBudget map)
        (initReputation map)
        (initNegawattLimit map)
        Material.model
        ! initGenerators



-- less hardcode??


initMap : SimMap
initMap =
    SimMap "first" Graph.empty (Weather 0.8 0.4) initNarrative 10000 { a = 1, b = 0 } 10


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


initNegawattLimit : SimMap -> MapLimit
initNegawattLimit map =
    map.initialNegawattLimit


initGenerators : List (Cmd Msg)
initGenerators =
    List.repeat 20 Generators.generateEdge
        ++ List.repeat 10 Generators.generatePeer
        ++ List.repeat 30 Generators.generatePVPanel
        ++ List.repeat 5 Generators.generateWindTurbine
