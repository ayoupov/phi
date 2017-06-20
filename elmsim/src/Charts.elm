module Charts exposing (donutChart)

import Html exposing (Html)
import Svg exposing (circle, svg)
import Svg.Attributes exposing (..)


donutChart : Int -> Int -> Float -> Html msg
donutChart size thickness percent =
    let
        viewbox =
            viewBox <| "0 0 " ++ toString size ++ " " ++ toString size

        center =
            toString <| toFloat size / 2.0

        radius =
            (toFloat size / 2.0) * 0.7

        radiusStr =
            toString radius

        circumference =
            2 * Basics.pi * radius
    in
    svg [ width (toString size), height (toString size), viewbox, class "donut" ]
        [ circle [ class "donut-hole", cx center, cy center, r radiusStr, fill "#fff" ] []
        , circle
            [ class "donut-ring"
            , cx center
            , cy center
            , r radiusStr
            , fill "transparent"
            , stroke "#d2d3d4"
            , strokeWidth <| toString thickness
            ]
            []
        , circle
            [ class "donut-segment"
            , cx center
            , cy center
            , r radiusStr
            , fill "transparent"
            , stroke "#33F"
            , strokeWidth <| toString thickness
            , strokeDasharray <| toString (percent * circumference) ++ " " ++ toString ((1 - percent) * circumference)
            , strokeDashoffset <| toString (circumference / 4)
            ]
            []
        ]
