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

generateWPS : (WaterPurificator -> Msg) -> Coords -> Cmd Msg
generateWPS genMsgConstructor coords =
    Random.map3 WaterPurificator
        -- daily
        (Random.constant [])
        -- maxGeneration
        (Random.float 10 30)
        -- coords
        (Random.constant coords)
        |> Random.generate genMsgConstructor


generateHousing : (Housing -> Msg) -> Coords -> Cmd Msg
generateHousing housingMsgConstructor coords =
    Random.map3 Housing
        --        generatePeerJoules
        (Random.map5 HousingWater
            -- stored
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
        |> Random.generate housingMsgConstructor

upgradeHousing : (ResilientHousing -> Msg) -> Coords -> Cmd Msg
upgradeHousing resilientMsgConstructor coords =
    Random.map5 ResilientHousing
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
        (Random.constant [1])
        -- dailyGeneration
        (Random.constant [])
        -- maxGen
        (Random.float 2 6)
        (Random.constant coords)
        |> Random.generate resilientMsgConstructor
