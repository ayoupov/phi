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


floatFmt : Float -> String
floatFmt num =
    format
        { decimals = 2
        , thousandSeparator = ","
        , decimalSeparator = "."
        }
        num


phiCoin : Budget -> String
phiCoin budget =
    budget
        |> List.head
        |> Maybe.map
            (format
                { decimals = 0
                , thousandSeparator = ","
                , decimalSeparator = "."
                }
            )
        |> Maybe.map ((++) "Φ")
        |> Maybe.withDefault "--"
