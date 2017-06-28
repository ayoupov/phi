module Chat.Narrative exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage, defaultMcaList)
import Html exposing (Html)
import Simulation.Model exposing (PhiNetwork)
import Simulation.Simulation exposing (networkConsumedEnergy, networkGeneratedEnergy, networkStoredEnergy, networkTradedEnergy)


introNarrative : List BotChatItem
introNarrative =
    [ BotMessage "Hello, I'm Phi."
    , BotMessage "Your interface to peer-to-peer energy."
    , BotMessage "To get started, ask me what I can do."
    , MultiChoiceItem <|
        MultiChoiceMessage
            "You can always select from the multiple choice options."
            [ McaIntro1, McaIntro2 ]
    ]


getStartedNarrative : List BotChatItem
getStartedNarrative =
    [ BotMessage "I help you design, simulate, and manage renewable energy resources and biosensors."
    , BotMessage """Here are some things you can tell me:
                 /day advances the simulation to the next day.
                 /weather aggregates a weather forecast from climate sensor data.
                 /build enables design mode.
                 """
    , MultiChoiceItem <|
        MultiChoiceMessage
            "I've preloaded a site for you based on your location."
            [ McaLaunchSite ]
    ]


siteNarrative : List BotChatItem
siteNarrative =
    [ BotMessage "Добро пожаловать в Усть-Карск."
    , BotMessage "Welcome to Ust-Karsk."
    , BotMessage "Population 1768."
    , BotMessage <|
        "We’re in a small urban settlement on the northern bank of the "
            ++ "Shilka River, in the Sretensky District of Zabaykalsky Krai, Russia."
    , BotMessage <|
        "The network has approved investment of 10,000 Phi Coin "
            ++ "to build renewable energy infrastructure in Ust-Karsk."
    , BotMessage "The Health meter compares the Joules requested by the Peer Community with the Joules available."
    , BotMessage "The Coverage meter compares the size of your Peer Community with the population of Ust-Karsk."
    , MultiChoiceItem <|
        MultiChoiceMessage
            "Enable design mode to add peers to the network, and to purchase generators."
            defaultMcaList
    ]


processNarrative : List BotChatItem -> Cmd Msg
processNarrative list =
    case list of
        [] ->
            Cmd.none

        botMessage :: tail ->
            [ ProcessNarrative tail
            , SendBotChatItem botMessage
            ]
                |> List.map (delayMessage 1)
                |> Cmd.batch


daySummary : PhiNetwork -> BotChatItem
daySummary network =
    let
        generatedEnergy =
            toString <| networkGeneratedEnergy network

        totalConsumed =
            toString <| networkConsumedEnergy network

        totalStored =
            toString <| networkStoredEnergy network

        text =
            "Yesterday we have generated "
                ++ generatedEnergy
                ++ " kWh in total, "
                ++ "the community had consumed "
                ++ totalConsumed
                ++ " kWh of energy, and "
                ++ totalStored
                ++ " kWh has stored in the batteries."
                ++ " Do you want to know more before I go on?"
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            ]


enterBuildModePeers : BotChatItem
enterBuildModePeers =
    let
        text =
            "Entering Build Mode! The newly illuminated nodes "
                ++ "represent potential peers (circles) whom you can invite to your"
                ++ "Phi community, and generators (squares) that you can purchase"
                ++ " in order to provide more energy to your network."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddGenerators
            , McaBuyCables
            ]


enterBuildModeGenerators : BotChatItem
enterBuildModeGenerators =
    let
        text =
            "GENERATORS!!! "
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaBuyCables
            ]


enterBuildModeLines : BotChatItem
enterBuildModeLines =
    let
        text =
            "CABLES!!!! "
                ++ "represent potential peers (circles) whom you can invite to your"
                ++ "Phi community, and generators (squares) that you can purchase"
                ++ " in order to provide more energy to your network."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaAddGenerators
            ]


exitBuildMode : BotChatItem
exitBuildMode =
    let
        text =
            "You've just added X pieces of Y, spending ZZZ PhiCoin."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            ]


dayBeginning : PhiNetwork -> BotChatItem
dayBeginning network =
    let
        text =
            "Glorious new day in Arstotzka"
    in
    BotMessage text


dayGenerated : PhiNetwork -> BotChatItem
dayGenerated network =
    let
        generatedEnergy =
            toString <| networkGeneratedEnergy network

        totalStored =
            toString <| networkStoredEnergy network

        text =
            "Today we have generated "
                ++ generatedEnergy
                ++ " kWh in total, "
                ++ totalStored
                ++ " kWh has stored in the batteries."
    in
    BotMessage text


dayConsumed : PhiNetwork -> BotChatItem
dayConsumed network =
    let
        totalConsumed =
            toString <| networkConsumedEnergy network

        text =
            "The community had consumed "
                ++ totalConsumed
                ++ " kWh of energy"
    in
    BotMessage text


dayTraded : PhiNetwork -> BotChatItem
dayTraded network =
    let
        totalTraded =
            toString <| networkTradedEnergy network

        text =
            "The community had traded "
                ++ totalTraded
                ++ " kWh of energy"
    in
    --        BotMessage text
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            ]
