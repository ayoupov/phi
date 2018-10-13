module View.ChatHeader exposing (NodeIcon(..), renderShape, viewChatHeader)

import Charts
import Html exposing (Html, b, br, div, p, span, text)
import Html.Attributes exposing (class)
import Material.Icon as Icon
import Model exposing (Model)
import Simulation.Stats exposing (communityCoverage, health, hCount, rhCount, wpCount)
import Svg exposing (circle, polygon, rect, svg)
import Svg.Attributes as SVG exposing (cx, cy, r, x, y)
import View.Helpers exposing (intFmt, phiCoin)

-- H: Housing, RH: Resilient housing, WP: Water processing
type NodeIcon
    = HIcon
    | RHIcon
    | WPIcon


renderShape : NodeIcon -> Int -> Html msg
renderShape icon size =
    case icon of
        HIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                , SVG.class "housingIcon"
                ]
                [ circle [ cx "15.5", cy "15.5", r "15" ] [] ]

        RHIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                -- todo: change classes
                , SVG.class "wtIcon"
                ]
                [ polygon [ SVG.points "15,4 31,31 0,31" ] [] ]

        WPIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                -- todo: change classes
                , SVG.class "spIcon"
                ]
                [ rect [ x "0", y "0", SVG.width "31", SVG.height "31" ] [] ]


viewChatHeader : Model -> Html msg
viewChatHeader model =
    let
        pt theText =
            p [] [ text theText ]

        renderNodeCount num =
            (case model.siteInfo.name of
                "" ->
                    "–"

                _ ->
                    toString num
            )
                |> (\x -> div [ class "node_count" ] [ text x ])

        statusTitleItem : String -> String -> String -> Maybe (Html msg)
        statusTitleItem className iconName txt =
            case txt of
                "" ->
                    Nothing

                "0" ->
                    Nothing

                "Week 0" ->
                    Nothing

                _ ->
                    span [ class className ]
                        [ Icon.view iconName [ Icon.size18 ]
                        , pt txt
                        ]
                        |> Just

        sitePop =
            intFmt model.siteInfo.population

        siteName =
            model.siteInfo.name

        thisStats =
            List.head model.stats
                |> Maybe.withDefault { health = 0, coverage = 0 }

        statusTitleBar =
            [ statusTitleItem "site_name" "location_city" siteName
            , statusTitleItem "population" "people" sitePop
            , statusTitleItem "week_no" "today" ("Week " ++ toString model.cycleCount)
            ]
                |> List.filterMap identity
    in
    div [ class "chat_header" ]
        [ div [ class "tint_overlay" ] []
        , div [ class "map_status" ]
            [ div [ class "title_bar" ] statusTitleBar
            , div [ class "status_body" ]
                [ div [ class "donut_legend" ] [ Charts.donutWithPct "Health" 70 5 (.health thisStats) ]
                , div [ class "hline" ] []
                , div [ class "donut_legend" ] [ Charts.donutWithPct "Coverage" 70 5 (.coverage thisStats) ]
                , div [ class "hline" ]
                    []
                , div
                    [ class "node_counts" ]
                    [ div [ class "node_count_row" ] [ renderShape HIcon 10, text "Housing", renderNodeCount (hCount model.network) ]
                    , div [ class "node_count_row" ] [ renderShape RHIcon 12, text "Resilient housing", renderNodeCount (rhCount model.network) ]
                    , div [ class "node_count_row" ] [ renderShape WPIcon 10, text "Water processing", renderNodeCount (wpCount model.network) ]
                    ]
                , div [ class "hline" ] []
                , div [ class "budget_status" ]
                    [ span [ class "budget_coin" ] [ text <| phiCoin model.budget ]
                    , br [] []
                    , text "Budget"
                    ]
                ]
            ]
        ]
