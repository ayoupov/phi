module Model exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (ChatItem, initChat)
import Graph
import Simulation.Model exposing (PhiNetwork, Weather)
import Simulation.Simulation as Simulation


type alias Model =
    { input : String
    , messages : List ChatItem
    , network : PhiNetwork
    , weather : Weather
    }


initModel : ( Model, Cmd Msg )
initModel =
    Model "" [ initChat ] Graph.empty initWeather
        ! initGenerators


initWeather : Weather
initWeather =
    Weather 0.8 0.4


initGenerators : List (Cmd Msg)
initGenerators =
    List.repeat 20 Simulation.generateEdge
        ++ List.repeat 10 Simulation.generatePeer
        ++ List.repeat 30 Simulation.generatePVPanel
        ++ List.repeat 5 Simulation.generateWindTurbine
