module View exposing (view)

import Action exposing (Msg(..))
import Chat.Model
    exposing
        ( BotChatItem(..)
        , ChatItem(..)
        , InputType(..)
        , MultiChoiceAction(..)
        , mcaName
        )
import Chat.View exposing (viewChatMsg)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Material.Button as Button
import Material.Chip as Chip
import Material.Elevation as Elevation
import Material.Icon as Icon
import Material.Options as Options
import Model exposing (Model)
import Svg exposing (g, svg)
import Svg.Attributes as SVG


view : Model -> Html Msg
view model =
    div [ class "chat_window" ]
        [ ul [ id "toScroll", class "messages" ]
            (List.map viewChatMsg (List.reverse model.messages))
        , chatHeader model
        , inputFooter model
        ]


chatHeader : Model -> Html Msg
chatHeader model =
    div [ class "chat_header" ]
        [ div [ class "map_status" ]
            [ div [ class "title_bar" ]
                [ span [ class "site_name" ] [ text "Nomovovo" ]
                , span [ class "population" ] [ text "12345" ]
                , span [ class "week_no" ] [ text "Week 20" ]
                ]
            , div [ class "status_body" ]
                [ div [ class "hline" ] []
                ]
            ]
        ]


inputFooter : Model -> Html Msg
inputFooter model =
    let
        toggleIcon =
            case model.inputType of
                FreeTextInput ->
                    "view_agenda"

                MultiChoiceInput ->
                    "text_format"

        inputCountainer =
            case model.inputType of
                FreeTextInput ->
                    freeTextFooter model

                MultiChoiceInput ->
                    multiChoiceFooter model
    in
    div [ class "input_footer" ]
        [ Options.div [ Elevation.e2, Options.cs "input_wrapper" ]
            [ Button.render Mdl
                [ 0 ]
                model.mdl
                [ Button.icon
                , Options.cs "input_type"
                , Options.onClick ToggleInputType
                ]
                [ Icon.i toggleIcon ]
            , div [ class "hline" ] []
            , inputCountainer
            ]
        ]


multiChoiceFooter : Model -> Html Msg
multiChoiceFooter model =
    let
        toMultiChoiceActionList chatItem =
            case chatItem of
                BotItem botItem ->
                    case botItem of
                        MultiChoiceItem item ->
                            Just item.options

                        _ ->
                            Nothing

                _ ->
                    Nothing

        lastMultiChoiceActionList =
            List.filterMap toMultiChoiceActionList model.messages
                |> List.head
                |> Maybe.withDefault [ McaRunDay ]
    in
    div [ class "input_container" ]
        (List.map viewMCA lastMultiChoiceActionList)


freeTextFooter : Model -> Html Msg
freeTextFooter model =
    let
        isEnter num =
            case num of
                13 ->
                    SendUserChatMsg

                _ ->
                    NoOp

        onEnter =
            on "keyup" (Json.map isEnter keyCode)
    in
    div [ class "input_container" ]
        [ input
            [ class "message_input"
            , onEnter
            , onInput Input
            , value model.input
            ]
            []
        , div [ class "hline" ] []
        , Button.render Mdl
            [ 0 ]
            model.mdl
            [ Button.flat
            , Options.onClick SendUserChatMsg
            , Options.cs "send_button"
            ]
            [ text "Send" ]
        ]


viewMCA : MultiChoiceAction -> Html Msg
viewMCA action =
    Chip.span
        [ Options.cs "multi_button"
        , Options.onClick (MultiChoiceMsg action)
        ]
        [ Chip.text [] <| mcaName action ]



--button
--    [ class "multi_button", onClick (MultiChoiceMsg action) ]
--    [ text (mcaName action) ]
