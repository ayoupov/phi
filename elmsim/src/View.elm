module View exposing (view)

import Action exposing (Msg(..))
import Chat exposing (ChatMsg, Sender(..))
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


inputFooter : Model -> Html Msg
inputFooter model =
    div [ class "bottom_wrapper clearfix" ]
        [ div [ class "message_input_wrapper" ]
            [ input
                [ class "message_input"
                , onEnter SendUserChatMsg
                , onInput Input
                , value model.input
                ]
                []
            ]
        , div [ class "send_message", onClick SendUserChatMsg ]
            [ div [ class "icon" ] []
            , div [ class "text" ] [ text "Send" ]
            ]
        ]


senderClass : Sender -> String
senderClass sender =
    case sender of
        User ->
            "user-sent"

        Bot ->
            "bot-sent"


viewChatMsg : ChatMsg -> Html msg
viewChatMsg msg =
    li [ class <| "message " ++ senderClass msg.sender ++ " appeared" ]
        [ div [ class "text_wrapper" ]
            [ div [ class "text" ] [ text msg.text ] ]
        ]


onEnter : Msg -> Attribute Msg
onEnter msg =
    let
        isEnter num =
            case num of
                13 ->
                    msg

                _ ->
                    NoOp
    in
    on "keyup" (Json.map isEnter keyCode)
