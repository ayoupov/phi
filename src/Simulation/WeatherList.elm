module Simulation.WeatherList exposing (..)

import Simulation.Model exposing (Weather, WeatherTuple)


-- returns next list, head is the forecast


restWeather : List WeatherTuple -> List WeatherTuple
restWeather list =
    let
        initialList =
            [ (0.29, 5)
            , (0.155, 0)
            , (0.58, 0)
            , (0.29, 0)
            , (0.385, 0)
            , (0.645, 0)
            , (0.435, 0)
            , (0.435, 0)
            , (0.665, 0)
            , (0.415, 0)
            , (0.435, 0)
            , (0.79, 0)
            , (0.53, 0)
            , (0.395, 0)
            , (0.58, 0)
            , (0.78, 0)
            , (0.405, 0)
            , (0.695, 0)
            , (0.415, 0)
            , (0.435, 0)
            , (0.395, 0)
            , (0.31, 0)
            , (0.29, 0)
            , (0.29, 0)
            , (0.51, 0)
            , (0.3, 0)
            , (0.445, 0)
            , (0.145, 0)
            , (0.135, 0)
            , (0.445, 0)
            , (0.78, 0)
            , (0.76, 0)
            , (0.695, 0)
            , (0.76, 0)
            , (0.425, 0)
            , (0.145, 0)
            , (0.08, 0)
            , (0.435, 0)
            , (0.185, 0)
            , (0.27, 0)
            , (0.83, 0)
            , (0.82, 0)
            , (0.665, 0)
            , (0.54, 0)
            , (0.435, 0)
            , (0.57, 0)
            , (0.935, 0)
            , (0.655, 0)
            , (0.705, 0)
            , (0.705, 0)
            , (0.195, 0)
            , (0.415, 0)
            , (0.57, 0)
            , (0.79, 0)
            , (0.57, 0)
            , (0.695, 0)
            , (0.77, 0)
            , (0.77, 0)
            , (0.53, 0)
            , (0.01, 0)
            , (0.08, 0)
            , (0.02, 0)
            , (0.3, 0)
            , (0.04, 0)
            , (0.405, 0)
            , (0.435, 0)
            , (0.405, 0)
            , (0.455, 0)
            , (0.33, 0)
            , (0.58, 0)
            , (0.78, 0)
            , (0.53, 0)
            , (0.155, 0)
            , (0.29, 0)
            , (0.395, 0)
            , (0.77, 0)
            , (0.925, 0)
            , (0.76, 0)
            , (0.31, 0)
            , (0.405, 0)
            , (0.83, 0)
            , (0.425, 0)
            , (0.32, 0)
            , (0.02, 0)
            , (0.32, 0)
            , (0.58, 0)
            , (0.205, 0)
            , (0.185, 0)
            , (0.02, 0)
            , (0.28, 0)
            , (0.155, 0)
            , (0.135, 0)
            , (0.425, 0)
            , (0.52, 0)
            , (0.135, 0)
            , (0.01, 0)
            , (0.06, 0)
            , (0.185, 0)
            , (0.04, 0)
            , (0.01, 0)
            , (0.02, 0)
            , (0.175, 0)
            , (0.08, 0)
            , (0.08, 0)
            , (0.145, 0)
            , (0.29, 0)
            , (0.445, 0)
            , (0.06, 0)
            , (0.165, 0)
            , (0.01, 0)
            , (0.185, 0)
            , (0.685, 0)
            , (0.32, 0)
            , (0.03, 0)
            , (0.02, 0)
            , (0.08, 0)
            , (0.07, 0)
            , (0.03, 0)
            , (0.08, 0)
            , (0.29, 0)
            , (0.455, 0)
            , (0.01, 0)
            , (0.06, 0)
            , (0.08, 0)
            , (0.03, 0)
            , (0.06, 0)
            , (0.02, 0)
            , (0.01, 0)
            , (0.03, 0)
            , (0.05, 0)
            , (0.01, 0)
            , (0.07, 0)
            , (0.05, 0)
            , (0.01, 0)
            , (0.165, 0)
            , (0.54, 0)
            , (0.385, 0)
            , (0.07, 0)
            , (0.01, 0)
            , (0.06, 0)
            , (0.08, 0)
            , (0.07, 0)
            , (0.04, 0)
            , (0.205, 0)
            , (0.03, 0)
            , (0.08, 0)
            , (0.06, 0)
            , (0.03, 0)
            , (0.185, 0)
            , (0.08, 0)
            , (0.05, 0)
            , (0.02, 0)
            , (0.02, 0)
            , (0.02, 0)
            , (0.02, 0)
            , (0.03, 0)
            , (0.02, 0)
            , (0.08, 0)
            , (0.02, 0)
            , (0.08, 0)
            , (0.03, 0)
            , (0.03, 0)
            , (0.08, 0)
            , (0.385, 0)
            , (0.56, 0)
            , ( 1.02, 0)
            , ( 1.08, 0)
            , (0.175, 0)
            , (0.05, 0)
            , (0.06, 0)
            , (0.155, 0)
            , (0.04, 0)
            , (0.02, 0)
            , (0.455, 0)
            , (0.05, 0)
            , (0.08, 0)
            , (0.06, 0)
            , (0.08, 0)
            , (0.08, 0)
            , (0.3, 0)
            , (0.395, 0)
            , (0.08, 0)
            , (0.195, 0)
            , (0.195, 0)
            , (0.205, 0)
            , (0.165, 0)
            , (0.05, 0)
            , (0.33, 0)
            , (0.185, 0)
            , (0.29, 0)
            , (0.455, 0)
            , (0.04, 0)
            , (0.04, 0)
            , (0.08, 0)
            , (0.455, 0)
            , (0.06, 0)
            , (0.02, 0)
            , (0.07, 0)
            , (0.08, 0)
            , (0.03, 0)
            , (0.06, 0)
            , (0.07, 0)
            , (0.07, 0)
            , (0.06, 0)
            , (0.04, 0)
            , (0.05, 0)
            , (0.04, 0)
            , (0.02, 0)
            , (0.06, 0)
            , (0.08, 0)
            , (0.02, 0)
            , (0.415, 0)
            , (0.905, 0)
            , (0.885, 0)
            , (0.905, 0)
            , (0.445, 0)
            , (0.185, 0)
            , (0.395, 0)
            , (0.08, 0)
            , (0.03, 0)
            , (0.08, 0)
            , (0.04, 0)
            , (0.05, 0)
            , (0.135, 0)
            , (0.155, 0)
            , (0.07, 0)
            , (0.435, 0)
            , (0.385, 0)
            , (0.455, 0)
            , (0.01, 0)
            , (0.04, 0)
            , (0.53, 0)
            , (0.395, 0)
            , (0.03, 0)
            , (0.04, 0)
            , (0.135, 0)
            , (0.945, 0)
            , (0.175, 0)
            , (0.06, 0)
            , (0.77, 0)
            , (0.31, 0)
            , (0.07, 0)
            , (0.52, 0)
            , (0.58, 0)
            , (0.77, 0)
            , (1.07, 0 )
            , (0.455, 0)
            , (0.08, 0)
            , (0.06, 0)
            , (0.05, 0)
            , (0.08, 0)
            , (0.06, 0)
            , (0.05, 0)
            , (0.385, 0)
            , (0.705, 0)
            , (0.195, 0)
            , (0.205, 0)
            , (0.06, 0)
            , (0.08, 0)
            , (0.06, 0)
            , (0.02, 0)
            , (0.135, 0)
            , (0.04, 0)
            , (0.195, 0)
            , (0.185, 0)
            , (0.08, 0)
            , (0.185, 0)
            , (0.185, 0)
            , (0.04, 0)
            , (0.01, 0)
            , (0.205, 0)
            , (0.05, 0)
            , (0.02, 0)
            , (0.07, 0)
            , (0.05, 0)
            , (0.52, 0)
            , (0.53, 0)
            , (0.83, 0)
            , (0.205, 0)
            , (0.635, 0)
            , (0.26, 0)
            , (0.895, 0)
            , (0.405, 0)
            , (0.145, 0)
            , (0.52, 0)
            , (0.455, 0)
            , (0.06, 0)
            , (0.02, 0)
            , (0.145, 0)
            , (0.145, 0)
            , (0.51, 0)
            , (0.415, 0)
            , (0.695, 0)
            , (0.58, 0)
            , (0.28, 0)
            , (0.32, 0)
            , (0.425, 0)
            , (0.8, 0)
            , (0.3, 0)
            , (0.51, 0)
            , (0.165, 0)
            , (0.01, 0)
            , (0.06, 0)
            , (0.06, 0)
            , (0.26, 0)
            , (0.29, 0)
            , (0.26, 0)
            , (0.02, 0)
            , (0.425, 0)
            , (0.205, 0)
            , (0.52, 0)
            , (0.3, 0)
            , (0.135, 0)
            , (0.175, 0)
            , (0.56, 0)
            , (0.07, 0)
            , (0.26, 0)
            , (0.55, 0)
            , (0.32, 0)
            , (0.54, 0)
            , (0.175, 0)
            , (0.06, 0)
            , (0.26, 0)
            , (0.52, 0)
            , (0.8, 0)
            , (0.165, 0)
            , (0.06, 0)
            , (0.04, 0)
            , (0.425, 0)
            , (0.955, 0)
            , (0.385, 0)
            , (0.705, 0)
            , (0.955, 0)
            , (0.935, 0)
            , (0.81, 0)
            , (0.385, 0)
            , (0.27, 0)
            , (0.53, 0)
            , (0.06, 0)
            , (0.165, 0)
            , (0.175, 0)
            , (0.28, 0)
            , (0.51, 0)
            , (0.455, 0)
            , (0.925, 0)
            , (0.55, 0)
            , (0.05, 0)
            , (0.08, 0)
            , (0.78, 0)
            , (0.53, 0)
            , (0.27, 0)
            , (0.175, 0)
            , (0.53, 0)
            , (0.385, 0)
            , (0.55, 0)
            , (0.145, 0)
            , (0.27, 0)
            , (0.385, 0)
            , (0.195, 0)
            , (0.165, 0)
            , (0.3, 0)
            , (0.185, 0)
            , (0.407142857, 0)
            ]
    in
    Maybe.withDefault initialList (List.tail list)


weatherTupleToWeather : ( Float, Int ) -> Weather
weatherTupleToWeather ( water, floodLevel ) =
    { water = water, floodLevel = floodLevel}
