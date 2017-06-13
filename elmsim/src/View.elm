module View exposing (view)

import Action exposing (Msg(..))
import Chat.Model exposing (BotChatItem(..), ChatItem(..), InputType(..), MultiChoiceAction(..), mcaName)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as Json
import Model exposing (Model)
import Svg exposing (g, svg)
import Svg.Attributes as SVG


view : Model -> Html Msg
view model =
    div []
        [ div [ class "chat_window" ]
            [ ul [ id "toScroll", class "messages" ]
                (List.map viewChatMsg (List.reverse model.messages))
            , inputFooter model
            ]
        ]


viewChatMsg : ChatItem -> Html Msg
viewChatMsg chatItem =
    let
        textMessage msgText senderClass =
            li [ class <| "message " ++ senderClass ++ " appeared" ]
                [ div [ class "text_wrapper" ]
                    [ div [ class "text" ] [ text msgText ] ]
                ]
    in
    case chatItem of
        UserMessage txt ->
            textMessage txt "user-sent"

        BotItem botItem ->
            case botItem of
                BotMessage txt ->
                    textMessage txt "bot-sent"

                WidgetItem widget ->
                    li [] [ text "rendering a fancy widget" ]

                MultiChoiceItem item ->
                    textMessage item.text "bot-sent"


inputFooter : Model -> Html Msg
inputFooter model =
    let
        toggleIcon =
            case model.inputType of
                FreeTextInput ->
                    "B"

                MultiChoiceInput ->
                    "A"

        inputCountainer =
            case model.inputType of
                FreeTextInput ->
                    freeTextFooter model

                MultiChoiceInput ->
                    multiChoiceFooter model
    in
    div [ class "bottom_wrapper" ]
        [ div [ class "input_type", onClick ToggleInputType ] [ text toggleIcon ]
        , inputCountainer
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
        , button [ class "send_button", onClick SendUserChatMsg ]
            [ text "Send" ]
        ]


viewMCA : MultiChoiceAction -> Html Msg
viewMCA action =
    button
        [ class "multi_button", onClick (MultiChoiceMsg action) ]
        [ text (mcaName action) ]
