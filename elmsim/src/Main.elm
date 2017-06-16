module Main exposing (..)

import Action exposing (Msg(..))
import Chat.Chat as Chat
import Chat.Model exposing (BotChatItem(..))
import Html
import Model exposing (Model, initModel)
import Update exposing (update)
import View exposing (view)


main =
    Html.program
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Chat.elizaReply (SendBotChatItem << BotMessage)
