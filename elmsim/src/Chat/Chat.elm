port module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Model exposing (..)
import Random.Extra.Task exposing (timeout)


delayResponse : Cmd Msg
delay


parseUserMessage : UserChatMessage -> Msg
parseUserMessage chatMsg =
    let
        imgWidgetWithUrl url =
            WidgetItem (ImageSrc url)
    in
    if String.contains "budget" chatMsg then
        SendBotChatItem <| imgWidgetWithUrl "assets/widget_budget_forecast.png"
    else if String.contains "wind" chatMsg then
        SendBotChatItem <| imgWidgetWithUrl "assets/widget_weather_data.png"
    else if String.contains "calculate" chatMsg then
        SendBotChatItem <| imgWidgetWithUrl "assets/widget_consumption_math.png"
    else if not (String.startsWith "/" chatMsg) then
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
