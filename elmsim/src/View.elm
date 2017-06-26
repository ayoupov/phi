module View exposing (view)

import Action exposing (Msg(..))
import Charts
import Chat.Model
    exposing
        ( BotChatItem(..)
        , ChatItem(..)
        , InputType(..)
        , MultiChoiceAction(..)
        , mcaName
        )
import FormatNumber exposing (format)
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
import Simulation.Model exposing (Budget)
import Svg exposing (circle, g, svg)
import Svg.Attributes as SVG
import View.ChatHeader exposing (viewChatHeader)
import View.ChatMessage exposing (viewChatMessage)


view : Model -> Html Msg
view model =
    div [ class "chat_window" ]
        [ ul [ id "toScroll", class "messages" ]
            (List.map viewChatMessage (List.reverse model.messages))
        , viewChatHeader model
        , inputFooter model
        ]


inputFooter : Model -> Html Msg
inputFooter model =
    let
        toggleIcon =
            case model.inputType of
                FreeTextInput ->
                    "view_agenda"

                MultiChoiceInput ->
                    "border_color"

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
                |> Maybe.withDefault [ McaRunDay, McaChangeDesign ]
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
            , autofocus True
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
