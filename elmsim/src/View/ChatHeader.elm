module View.ChatHeader exposing (viewChatHeader)

import Charts
import Html exposing (Html, b, br, div, p, span, text)
import Html.Attributes exposing (class)
import Material.Icon as Icon
import Model exposing (Model)
import Svg exposing (circle, polygon, rect, svg)
import Svg.Attributes as SVG
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

        peerIcon =
            svg [ SVG.width "15", SVG.height "15", SVG.class "node peer" ] [ circle [] [] ]

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
                    [ div [ class "donut_legend" ] [ phText, Charts.donutWithPct 45 3 0.5 ]
                    , div [ class "donut_legend" ] [ ccText, Charts.donutWithPct 45 3 0.3 ]
                    ]
                , div [ class "hline" ] []
                , div [ class "status_section" ]
                    [ div [ class "node_counts" ]
                        [ div [] [ text "Peers", peerIcon, text <| toString 24 ]
                        , div [] [ text "Solar Panels", peerIcon, text <| toString 6 ]
                        , div [] [ text "Wind Turbines", peerIcon, text <| toString 8 ]
                        ]
                    , div [ class "budget_status" ]
                        [ b [] [ text "BUDGET" ]
                        , br [] []
                        , span [ class "budget_coin" ] [ text <| phiCoin model.budget ]
                        ]
                    ]
                ]
            ]
        ]
