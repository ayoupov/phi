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

generateWPS : (SimGenerator -> Msg) -> Coords -> Cmd Msg
generateWPS genMsgConstructor coords =
    Random.map4 SimGenerator
        (Random.constant [])
        -- dailyGeneration
        (Random.float 25 50)
        -- maxGeneration
        (Random.constant coords)
        (Random.constant WaterPurificator)
        |> Random.generate genMsgConstructor


generateHousing : (Housing -> Msg) -> Coords -> Cmd Msg
generateHousing peerMsgConstructor coords =
    Random.map3 Housing
        --        generatePeerJoules
        (Random.map5 HousingWater
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
        -- initial reputation
        (Random.constant [ 1 ])
        (Random.constant coords)
        |> Random.generate peerMsgConstructor

upgradeHousing : (Housing -> Msg) -> Coords -> Cmd Msg
upgradeHousing peerMsgConstructor coords =
    Random.map3 Housing
        --        generatePeerJoules
        (Random.map5 HousingWater
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
        -- initial reputation
        (Random.constant [ 1 ])
        (Random.constant coords)
        |> Random.generate peerMsgConstructor
