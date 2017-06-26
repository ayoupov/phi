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
    | PVIcon


renderShape : NodeIcon -> Int -> Html msg
renderShape icon size =
    case icon of
        PeerIcon ->
            svg [] []

        WTIcon ->
            svg [] []

        PVIcon ->
            svg [] []


viewChatHeader : Model -> Html msg
viewChatHeader model =
    let
        pt theText =
            p [] [ text theText ]

        peerIcon size =
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 31 31"
                , SVG.class "peerIcon"
                ]
                [ circle [ cx "15.5", cy "15.5", r "15" ] [] ]

        squareIcon className size =
            svg
                [ SVG.width (toString size)
                , SVG.height (toString size)
                , SVG.viewBox "0 0 30 30"
                , SVG.class className
                ]
                [ rect [ x "0", y "0", SVG.width "30", SVG.height "30" ] [] ]

        wtIcon size =
            squareIcon "wtIcon" size

        spIcon size =
            squareIcon "spIcon" size

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
    in
    div [ class "chat_header" ]
        [ div [ class "map_status" ]
            [ div [ class "title_bar" ]
                [ statusTitle "site_name" "location_city" siteName
                , statusTitle "population" "people" sitePop
                , statusTitle "week_no" "today" "Week 20"
                ]
            , div [ class "status_body" ]
                [ div [ class "status_section" ]
                    [ div [ class "donut_legend" ] [ phText, Charts.donutWithPct 45 3 <| health model.network ]
                    , div [ class "hline" ] []
                    , div [ class "donut_legend" ] [ ccText, Charts.donutWithPct 45 3 <| communityCoverage model.network ]
                    ]
                , div [ class "hline" ] []
                , div [ class "status_section" ]
                    [ div [ class "node_counts" ]
                        [ div [ class "node_count_row" ] [ peerIcon 10, text "Peers", renderNodeCount (peerCount model.network) ]
                        , div [ class "node_count_row" ] [ spIcon 10, text "Solar Panels", renderNodeCount (spCount model.network) ]
                        , div [ class "node_count_row" ] [ wtIcon 10, text "Wind Turbines", renderNodeCount (wtCount model.network) ]
                        ]
                    , div [ class "hline" ] []
                    , div [ class "budget_status" ]
                        [ b [] [ text "BUDGET" ]
                        , br [] []
                        , span [ class "budget_coin" ] [ text <| phiCoin model.budget ]
                        ]
                    ]
                ]
            ]
        ]
