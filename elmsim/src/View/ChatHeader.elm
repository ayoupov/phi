module View.ChatHeader exposing (viewChatHeader)

import Charts
import Html exposing (Html, b, br, div, p, span, text)
import Html.Attributes exposing (class)
import Material.Icon as Icon
import Model exposing (Model)
import Simulation.Stats exposing (communityCoverage, health, peerCount, spCount, wtCount)
import Svg exposing (circle, polygon, rect, svg)
import Svg.Attributes as SVG exposing (cx, cy, r, x, y)
import View.Helpers exposing (intFmt, phiCoin)


type NodeIcon
    = PeerIcon
    | WTIcon
    | SPIcon


renderShape : NodeIcon -> Int -> Html msg
renderShape icon size =
    case icon of
        PeerIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                , SVG.class "peerIcon"
                ]
                [ circle [ cx "15.5", cy "15.5", r "15" ] [] ]

        WTIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                , SVG.class "wtIcon"
                ]
                [ polygon [ SVG.points "15,4 31,31 0,31" ] [] ]

        SPIcon ->
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                , SVG.class "spIcon"
                ]
                [ rect [ x "0", y "0", SVG.width "31", SVG.height "31" ] [] ]


viewChatHeader : Model -> Html msg
viewChatHeader model =
    let
        pt theText =
            p [] [ text theText ]

        renderNodeCount num =
            div [ class "node_count" ] [ text (toString num) ]

        phText =
            div [ class "ph_text" ]
                [ b [] [ text "PHI" ]
                , br [] []
                , text "health"
                ]

        ccText =
            div [ class "cc_text" ]
                [ b [] [ text "COMMUNITY" ]
                , br [] []
                , text "coverage"
                ]

        statusTitle className iconName txt =
            span [ class className ]
                [ Icon.view iconName [ Icon.size18 ]
                , pt txt
                ]

        sitePop =
            intFmt model.siteInfo.population

        siteName =
            model.siteInfo.name

        thisStats =
            List.head model.stats
                |> Maybe.withDefault { health = 0, coverage = 0.15 }
    in
    div [ class "chat_header" ]
        [ div [ class "tint_overlay" ] []
        , div [ class "map_status" ]
            [ div [ class "title_bar" ]
                [ statusTitle "site_name" "location_city" siteName
                , statusTitle "population" "people" sitePop
                , statusTitle "week_no" "today" "Week 20"
                ]
            , div [ class "status_body" ]
                [ div [ class "donut_legend" ] [ Charts.donutWithPct 40 3 (.health thisStats), text "health" ]
                , div [ class "hline" ] []
                , div [ class "donut_legend" ] [ Charts.donutWithPct 40 3 (.coverage thisStats), text "coverage" ]
                , div [ class "hline" ]
                    []
                , div
                    [ class "node_counts" ]
                    [ div [ class "node_count_row" ] [ renderShape PeerIcon 10, text "Peers", renderNodeCount (peerCount model.network) ]
                    , div [ class "node_count_row" ] [ renderShape SPIcon 10, text "Solar Panels", renderNodeCount (spCount model.network) ]
                    , div [ class "node_count_row" ] [ renderShape WTIcon 12, text "Wind Turbines", renderNodeCount (wtCount model.network) ]
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
