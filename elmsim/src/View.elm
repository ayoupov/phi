module View exposing (view)

import Action exposing (Msg(..))
import Chat.Model exposing (ChatItem(..), BotChatItem(..))
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


viewChatMsg : ChatItem -> Html msg
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
