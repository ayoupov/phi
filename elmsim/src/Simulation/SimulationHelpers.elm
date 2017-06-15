module Simulation.SimulationHelpers exposing (..)

-- function helpers

takeFirstElementWithDefault1 list =
    Maybe.withDefault 1 (List.head list)

takeFirstElementWithDefault0 list =
    Maybe.withDefault 0 (List.head list)
