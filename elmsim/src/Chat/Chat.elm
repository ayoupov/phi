module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Model exposing (..)


parseUserMessage : UserChatMessage -> Msg
parseUserMessage chatMsg =
    if not (String.startsWith "/" chatMsg) then
        """Sorry, I only respond to commands! Current available ones are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""
            |> BotMessage
            |> SendBotChatItem
    else if chatMsg == "/weather" then
        CheckWeather
    else if chatMsg == "/turn" then
        CallTurn
    else if String.startsWith "/describe" chatMsg then
        String.split " " chatMsg
            |> (List.head << List.drop 1)
            |> Maybe.andThen (Result.toMaybe << String.toInt)
            |> Maybe.map DescribeNode
            |> Maybe.withDefault
                ("I can't find that node!"
                    |> BotMessage
                    |> SendBotChatItem
                )
    else
        NoOp
