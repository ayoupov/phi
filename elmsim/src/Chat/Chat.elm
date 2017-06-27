port module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Model exposing (..)


parseUserMessage : UserChatMessage -> Msg
parseUserMessage chatMsg =
    if not (String.startsWith "/" chatMsg) then
        SendToEliza chatMsg
    else if chatMsg == "/weather" then
        CheckWeather
    else if chatMsg == "/turn" then
        CallTurn
    else if chatMsg == "/budget" then
        CheckBudget
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
        """Sorry, I only respond to a few commands! Current available ones are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""
            |> BotMessage
            |> SendBotChatItem


port sendToEliza : UserChatMessage -> Cmd msg


port elizaReply : (BotChatMessage -> msg) -> Sub msg
