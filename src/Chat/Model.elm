module Chat.Model exposing (..)

import Dict exposing (Dict)
import Html exposing (img)


type ChatItem
    = UserMessage UserChatMessage
    | BotItem BotChatItem


type alias UserChatMessage =
    String


type alias BotChatMessage =
    String


type BotChatItem
    = WidgetItem Widget
    | BotMessage BotChatMessage
    | MultiChoiceItem MultiChoiceMessage


type alias MultiChoiceMessage =
    { text : String
    , options : List MultiChoiceAction
    }


type MultiChoiceAction
    = McaRunCycle
    | McaRunWeek
    | McaWeatherForecast
    | McaBuildHousing
    | McaUpgradeHousing
    | McaAddWP
    | McaLeaveBuildMode
    | McaLaunchBarje
    | McaSkipIntro
    | McaIntro1
    | McaIntro2
    | McaAboutHealth


mcaName : MultiChoiceAction -> String
mcaName action =
    case action of
        McaRunCycle ->
            "Next Week"

        McaWeatherForecast ->
            "Weather"

        McaBuildHousing ->
            "Build housing"

        McaUpgradeHousing ->
            "Upgrade housing"

        McaAddWP ->
            "Buy WPS"

        McaRunWeek ->
            "Next Week"

        McaLeaveBuildMode ->
            "Leave Build Mode"

        McaLaunchBarje ->
            "Load Barje"

        McaSkipIntro ->
            "Skip Intro"

        McaIntro1 ->
            "Get Started"

        McaIntro2 ->
            "What can Phi do?"

        McaAboutHealth ->
            "More Info"


type Widget
    = WeatherWidget
    | BotMultiQuestion
    | ImageSrc String


defaultMcaList : List MultiChoiceAction
defaultMcaList =
--    [ McaAddPeers, McaAddGenerators, McaBuyCables, McaRunDay ]
    [ McaBuildHousing, McaUpgradeHousing, McaAddWP, McaRunCycle ]


initChat : ChatItem
initChat =
    BotItem <|
        MultiChoiceItem <|
            MultiChoiceMessage
                """Welcome to Φ Chat! I only respond to commands for now.
Current available commands are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""
                [ McaLaunchBarje, McaSkipIntro ]
