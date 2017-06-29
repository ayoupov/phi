module View.ChatMessage exposing (viewChatMessage)

import Action exposing (Msg)
import Chat.Model exposing (BotChatItem(..), ChatItem(..), Widget(..))
import Html exposing (Html, div, img, li, text)
import Html.Attributes exposing (class, src)
import View.MessageRenderer exposing (textToHtml)


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
                [ div [ class "text" ]  (textToHtml msgText)  ]
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
                            renderWidget widget

                        MultiChoiceItem item ->
                            textContent item.text
            in
            messageWrapper "bot-sent" <| contents


renderWidget : Widget -> List (Html Msg)
renderWidget widget =
    case widget of
        ImageSrc url ->
            [ div [ class "widget_wrapper" ] [ img [ src url ] [] ] ]

        _ ->
            [ div [ class "text_wrapper" ] [ text "rendering a fancy widget" ] ]
