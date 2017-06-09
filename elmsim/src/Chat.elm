module Chat exposing (..)

import Action exposing (Msg(..))


type alias ChatMsg =
    { sender : Sender
    , text : String
    }


type Sender
    = User
    | Bot


initChat : ChatMsg
initChat =
    ChatMsg Bot
        """Welcome to Φ Chat! I only respond to commands for now.
Current available commands are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""


parseUserMessage : ChatMsg -> Msg
parseUserMessage chatMsg =
    if not (String.startsWith "/" chatMsg.text) then
        SendBotChatMsg
            """Sorry, I only respond to commands! Current available ones are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""
    else if chatMsg.text == "/weather" then
        CheckWeather
    else if chatMsg.text == "/turn" then
        CallTurn
    else if String.startsWith "/describe" chatMsg.text then
        String.split " " chatMsg.text
            |> (List.head << List.drop 1)
            |> Maybe.andThen (Result.toMaybe << String.toInt)
            |> Maybe.map DescribeNode
            |> Maybe.withDefault (SendBotChatMsg "I can't find that node!")
    else
        NoOp
