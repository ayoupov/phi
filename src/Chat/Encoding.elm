module Chat.Encoding exposing (..)

import Chat.Model exposing (..)
import Json.Encode as Json


encodeChatItem : ChatItem -> Json.Value
encodeChatItem item =
    let
        senderType =
            case item of
                UserMessage _ ->
                    "user"

                BotItem _ ->
                    "bot"

        messageBody =
            case item of
                UserMessage msg ->
                    msg

                BotItem item ->
                    case item of
                        BotMessage botText ->
                            botText

                        MultiChoiceItem mcMessage ->
                            mcMessage.text

                        _ ->
                            "WIDGET"

        messageType =
            case item of
                UserMessage _ ->
                    "text"

                BotItem item ->
                    case item of
                        BotMessage _ ->
                            "text"

                        MultiChoiceItem _ ->
                            "text"

                        WidgetItem _ ->
                            "widget"
    in
    Json.object
        [ ( "sender", Json.string senderType )
        , ( "messageBody", Json.string messageBody )
        ]
