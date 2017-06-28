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
    = McaRunDay
    | McaRunWeek
    | McaWeatherForecast
    | McaAddPeers
    | McaAddGenerators
    | McaBuyCables
    | McaLeaveBuildMode
    | McaLaunchSite
    | McaSkipIntro
    | McaIntro1
    | McaIntro2
    | McaAboutHealth


mcaName : MultiChoiceAction -> String
mcaName action =
    case action of
        McaRunDay ->
            "Next Day"

        McaWeatherForecast ->
            "Weather"

        --        McaChangeDesign ->
        --            "Change Design"
        McaAddPeers ->
            "Add Peers"

        McaAddGenerators ->
            "Buy Generators"

        McaBuyCables ->
            "Install Cables"

        McaRunWeek ->
            "Next Week"

        McaLeaveBuildMode ->
            "Leave Build Mode"

        McaLaunchSite ->
            "Load Ust-Karsk"

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
    [ McaAddPeers, McaAddGenerators, McaBuyCables, McaRunDay, McaAboutHealth ]


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
                [ McaLaunchSite, McaSkipIntro ]
