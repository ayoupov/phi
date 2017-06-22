module View.Helpers exposing (..)

import FormatNumber exposing (format)
import Simulation.Model exposing (Budget)


intFmt : Int -> String
intFmt num =
    format
        { decimals = 0
        , thousandSeparator = ","
        , decimalSeparator = "."
        }
        (toFloat num)


phiCoin : Budget -> String
phiCoin budget =
    budget
        |> List.head
        |> Maybe.withDefault 0
        |> format
            { decimals = 0
            , thousandSeparator = ","
            , decimalSeparator = "."
            }
        |> (++) "Φ"
