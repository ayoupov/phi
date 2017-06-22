module Simulation.Init.Generators exposing (..)

import Action exposing (Msg(..))
import Array
import Graph exposing (NodeId)
import Random exposing (Generator)
import Random.Extra as Random
import Set exposing (Set)
import Simulation.GraphUpdates exposing (createEdge)
import Simulation.Model exposing (..)
import Simulation.NodeList as NodeList
import Simulation.WeatherList exposing (restWeather, weatherTupleToWeather)


--generateWeather : List WeatherTuple -> Cmd Msg
--generateWeather list =
--    Random.map2 Weather
--        (Random.float 0 1)
--        (Random.float 0 1)
--        |> Random.generate UpdateWeather


generatePVPanel : Coords -> Cmd Msg
generatePVPanel coords =
    Random.map4 SimGenerator
        (Random.constant [])
        -- dailyConsumption
        (Random.float 0 10)
        -- maxGeneration
        (Random.constant coords)
        -- xy coordinates
        (Random.constant SolarPanel)
        -- generator type
        |> Random.generate AddGenerator


generateWindTurbine : Coords -> Cmd Msg
generateWindTurbine coords =
    Random.map4 SimGenerator
        (Random.constant [])
        (Random.float 0 10)
        -- capacity
        (Random.constant coords)
        (Random.constant WindTurbine)
        |> Random.generate AddGenerator


generatePeer : Coords -> Cmd Msg
generatePeer coords =
    Random.map4 Peer
        --        generatePeerJoules
        (Random.map5 PeerJoules
            (Random.constant [ 0 ])
            -- actual consumption
            (Random.constant [ 0 ])
            -- desired consumption
            (Random.float 5 10)
            -- seedRating in joules?
            (Random.constant [ 0 ])
            -- initial trade balance
            (Random.constant [ 0 ])
        )
        -- negawatts
        (Random.constant [ 0 ])
        -- initial reputation
        (Random.constant [ 1 ])
        (Random.constant coords)
        |> Random.generate AddPeer


generateEdge : Cmd Msg
generateEdge =
    Random.map2 createEdge
        --        (Random.int 0 45)
        --        (Random.int 0 45)
        (Random.int 0 20)
        (Random.int 0 20)
        |> Random.generate AddEdge
