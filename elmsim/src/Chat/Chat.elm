port module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (..)
import Chat.Narrative exposing (getStartedNarrative, siteNarrative)
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
        ( msg, timeout ) =
            case action of
                McaWeatherForecast ->
                    ( CheckWeather, 1 )

                McaAddPeers ->
                    ( ChangeBuildMode "peers", 0 )

                McaAddGenerators ->
                    ( ChangeBuildMode "generators", 0 )

                McaBuyCables ->
                    ( ChangeBuildMode "lines", 0 )

                McaLeaveBuildMode ->
                    ( ChangeBuildMode "none", 0 )

                McaRunDay ->
                    ( CallTurn, 1 )

                McaLaunchSite ->
                    ( ProcessNarrative siteNarrative, 1 )

                McaSkipIntro ->
                    ( SendBotChatItem <|
                        MultiChoiceItem <|
                            MultiChoiceMessage
                                "I guess you already know all about me :)"
                                defaultMcaList , 0.5
                    )

                McaIntro1 ->
                    ( ProcessNarrative getStartedNarrative, 0.5 )

                McaIntro2 ->
                    ( ProcessNarrative getStartedNarrative, 0.5 )

                _ ->
                    ( NoOp, 0 )
    in
    delayMessage timeout msg


port sendToEliza : UserChatMessage -> Cmd msg


port elizaReply : (BotChatMessage -> msg) -> Sub msg
