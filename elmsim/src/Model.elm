module Model exposing (..)

import Action exposing (Msg)
import Chat exposing (ChatMsg, initChat)
import Graph
import Simulation.Model exposing (PhiNetwork, Weather)
import Simulation.Simulation as Simulation


type alias Model =
    { input : String
    , messages : List ChatMsg
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
        ++ List.repeat 7 Simulation.generatePVPanel
        ++ List.repeat 3 Simulation.generateWindTurbine
