port module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (..)
import Chat.Narrative exposing (siteNarrative)
import Model exposing (Model)
import Process
import Task
import Time


handleTextInputMessage : UserChatMessage -> Cmd Msg
handleTextInputMessage chatMsg =
    let
        imgWidgetWithUrl url =
            WidgetItem (ImageSrc url)

        msgToSend =
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
    in
    delayMessage 2 msgToSend


handleMultiChoiceMessage : MultiChoiceAction -> Cmd Msg
handleMultiChoiceMessage action =
    let
        msg =
            case action of
                McaWeatherForecast ->
                    CheckWeather

                McaAddPeers ->
                    ChangeBuildMode "peers"

                McaAddGenerators ->
                    ChangeBuildMode "generators"

                McaBuyCables ->
                    ChangeBuildMode "lines"

                McaLeaveBuildMode ->
                    ChangeBuildMode "none"

                McaRunDay ->
                    CallTurn

                McaLaunchSite ->
                    ProcessNarrative siteNarrative

                _ ->
                    NoOp
    in
    delayMessage 1 msg


port sendToEliza : UserChatMessage -> Cmd msg


port elizaReply : (BotChatMessage -> msg) -> Sub msg
