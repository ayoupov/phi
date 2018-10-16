port module Chat.Chat exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (..)
import Chat.Narrative exposing (aboutHealthNarrative, getStartedNarrative, processNarrative, showMap, siteNarrative)
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
                        /turn (i move to the next cycle)
                        /describe [nodeId] (i tell you some info about a specific node)
                        """
                    |> BotMessage
                    |> SendBotChatItem
    in
    delayMessage 2 msgToSend


handleMultiChoiceMessage : MultiChoiceAction -> Cmd Msg
handleMultiChoiceMessage action =
    case action of
        McaWeatherForecast ->
            delayMessage 1 CheckWeather

        McaBuildHousing ->
            delayMessage 0 <| ChangeBuildMode "housing"

        McaUpgradeHousing ->
            delayMessage 0 <| ChangeBuildMode "resilient"

        McaAddWP ->
            delayMessage 0 <| ChangeBuildMode "generators"

        McaLeaveBuildMode ->
            delayMessage 0 <| ChangeBuildMode "none"

        McaRunCycle ->
            [ delayMessage 0 (ToggleInputAvailable False)
            , delayMessage 1 CallTurn
            ]
                |> Cmd.batch

        McaLaunchBarje ->
            processNarrative siteNarrative

        McaSkipIntro ->
            [ delayMessage 0.5
                (SendBotChatItem <|
                    MultiChoiceItem <|
                        MultiChoiceMessage
                            "Dobrodošli v Barje | Welcome to Barje."
                            defaultMcaList
                )
            , showMap ()
            , delayMessage 0 (UpdateSiteName "Barje")
            , delayMessage 0 (UpdateSitePopulation 10429)
            , delayMessage 0 IncrementCycleCount
            , delayMessage 0.5 InitializeNetwork
            , delayMessage 0.5 InitializeBudget
            ]
                |> Cmd.batch

        McaIntro1 ->
            processNarrative getStartedNarrative

        McaIntro2 ->
            processNarrative getStartedNarrative

        McaAboutHealth ->
            processNarrative aboutHealthNarrative

        _ ->
            Cmd.none


port sendToEliza : UserChatMessage -> Cmd msg


port elizaReply : (BotChatMessage -> msg) -> Sub msg
