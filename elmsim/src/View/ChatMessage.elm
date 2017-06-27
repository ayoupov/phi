module View.ChatMessage exposing (viewChatMessage)

import Action exposing (Msg)
import Chat.Model exposing (BotChatItem(..), ChatItem(..))
import Html exposing (Html, div, li, text)
import Html.Attributes exposing (class)


viewChatMessage : ChatItem -> Html Msg
viewChatMessage chatItem =
    let
        messageWrapper senderClass children =
            li [ class <| "message appeared " ++ senderClass ]
                children

        messageHeader name =
            div [ class "message_header" ] [ text name ]

        textContent msgText =
            [ div [ class "text_wrapper" ]
                [ div [ class "text" ] [ text msgText ] ]
            ]
    in
    case chatItem of
        UserMessage txt ->
            messageWrapper "user-sent" <| textContent txt

        BotItem botItem ->
            let
                contents =
                    case botItem of
                        BotMessage txt ->
                            textContent txt

                        WidgetItem widget ->
                            textContent "rendering a fancy widget"

                        MultiChoiceItem item ->
                            textContent item.text
            in
            messageWrapper "bot-sent" <| [ messageHeader "Phi" ] ++ contents
