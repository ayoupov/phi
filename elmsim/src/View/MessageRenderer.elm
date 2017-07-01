module View.MessageRenderer exposing (..)

import Html exposing (Html, span, text)
import Html.Attributes exposing (class)
import String exposing (split)
import View.ChatHeader exposing (NodeIcon(..), renderShape)


textToHtml : String -> List (Html msg)
textToHtml input =
    let
        tokens =
            split "$$" input

        convert : String -> Html msg
        convert token =
            case token of
                "_PEER_" ->
                    --                    span [class "peer"] [text "PEER"]
                    renderShape PeerIcon 10

                "_PANEL_" ->
                    renderShape SPIcon 10

                "_TURBINE_" ->
                    renderShape WTIcon 10

                "_CABLE_" ->
                    span [ class "cable" ] [ text "CABLE" ]

                _ ->
                    text token
    in
    tokens
        |> List.map convert
