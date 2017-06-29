port module Chat.Narrative exposing (..)

import Action exposing (Msg(..), NarrativeElement)
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage, defaultMcaList)
import Html exposing (Html)
import Simulation.Model exposing (PhiNetwork)
import Simulation.Simulation exposing (networkConsumedEnergy, networkGeneratedEnergy, networkStoredEnergy, networkTradedEnergy)


chatWithDelay : Float -> List Msg -> BotChatItem -> NarrativeElement
chatWithDelay delay msgs botChatItem =
    SendBotChatItem botChatItem
        :: msgs
        |> NarrativeElement delay


initMsg : Msg -> NarrativeElement
initMsg msg =
    NarrativeElement 0 [ msg ]


introNarrative : List NarrativeElement
introNarrative =
    [ BotMessage "Hello, I'm Phi."
        |> chatWithDelay 1.5 []
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "Your interface to peer-to-peer energy."
            [ McaIntro1, McaSkipIntro ]
      )
        |> chatWithDelay 2.25 []
    ]


aboutHealthNarrative : List NarrativeElement
aboutHealthNarrative =
    [ BotMessage "The Health meter compares the Joules requested by the Peer Community with the Joules available."
        |> chatWithDelay 1.5 [ ToggleInputAvailable True ]
    , BotMessage "The Coverage meter compares the size of your Peer Community with the population of Ust-Karsk."
        |> chatWithDelay 2 []
    , BotMessage "Click the button below to load the map."
        |> chatWithDelay 3 []
    ]


getStartedNarrative : List NarrativeElement
getStartedNarrative =
    [ initMsg (ToggleInputAvailable False)
    , BotMessage "I can help you design, simulate, and manage renewable energy resources and biosensors."
        |> chatWithDelay 1 []
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "I've selected a site based on your location."
            [ McaLaunchSite, McaAboutHealth ]
      )
        |> chatWithDelay 2.5 [ ToggleInputAvailable True ]
    ]


siteNarrative : List NarrativeElement
siteNarrative =
    [ initMsg (ToggleInputAvailable False)
    , BotMessage "Добро пожаловать в Усть-Карск."
        |> chatWithDelay 1 [ ShowMap ]
    , BotMessage "Welcome to Ust-Karsk."
        |> chatWithDelay 0 []
    , (BotMessage <|
        "We’re in a small urban settlement on the northern bank of the "
            ++ "Shilka River, in the Sretensky District of Zabaykalsky Krai, Russia."
      )
        |> chatWithDelay 2.25 []
    , (BotMessage <|
        "You've received a Φ10,000 investment on behalf of 'ШИФТ Truckers' Peer Community"
            ++ " to build a renewable energy network in Ust-Karsk."
      )
        |> chatWithDelay 5.5 []
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "To begin building your network add [symbol] peers, buy [symbol] generators, and install [symbol] cables."
            defaultMcaList
      )
        |> chatWithDelay 7 []
    , BotMessage "A network is made up of [symbol] peers, [symbol] solar panels, [symbol] wind turbines, and [symbol] cables."
        |> chatWithDelay 5 [ ToggleInputAvailable True ]
    ]


processNarrative : List NarrativeElement -> Cmd Msg
processNarrative list =
    case list of
        [] ->
            Cmd.none

        narrativeElt :: tail ->
            ProcessNarrative tail
                :: narrativeElt.updateMsgs
                |> List.map (delayMessage narrativeElt.timeDelaySec)
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
            "Daily Briefing: "
                ++ generatedEnergy
                ++ " Joules created."
                ++ totalConsumed
                ++ " Joules burned."
                ++ totalStored
                ++ " surplus stored in batteries."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            ]


enterBuildModePeers : List NarrativeElement
enterBuildModePeers =
    [ BotMessage "Click [symbol] to add new peers."
        |> chatWithDelay 1 []
    , BotMessage "Next click the button below to buy generators."
        |> chatWithDelay 6 []
    ]


enterBuildModeGenerators : BotChatItem
enterBuildModeGenerators =
    let
        text =
            "Click [symbol] to buy new solar panels."
                ++ " Click [symbol] to buy new wind turbines."
                ++ " Next click the button to install cables."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaRunDay
            , McaAddPeers
            , McaBuyCables
            , McaWeatherForecast
            ]


enterBuildModeLines : BotChatItem
enterBuildModeLines =
    let
        text =
            "Nodes must be connected to share energy. Click from [symbol] to [symbol] or [symbol] to install distribution cables."
                ++ " Next click the button to go to the next day."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaWeatherForecast
            ]


exitBuildMode : BotChatItem
exitBuildMode =
    let
        text =
            "Daily Briefing:"
                ++ " В пустой бочке звону больше. | An empty barrel rings loudly."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            , McaWeatherForecast
            ]


dayBeginning : PhiNetwork -> BotChatItem
dayBeginning network =
    let
        text =
            "Назвался груздем, полезай в кузов. | The mushroom climbed into the body."
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
            ""
                ++ generatedEnergy
                ++ " Joules created. "
                ++ totalStored
                ++ " surplus stored in batteries."
    in
    BotMessage text


dayConsumed : PhiNetwork -> BotChatItem
dayConsumed network =
    let
        totalConsumed =
            toString <| networkConsumedEnergy network

        text =
            ""
                ++ totalConsumed
                ++ " Joules burned."
    in
    BotMessage text


dayTraded : PhiNetwork -> BotChatItem
dayTraded network =
    let
        totalTraded =
            toString <| networkTradedEnergy network

        text =
            ""
                ++ totalTraded
                ++ " Joules traded."
    in
    --        BotMessage text
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaRunDay
            , McaAddPeers
            , McaAddGenerators
            , McaBuyCables
            , McaWeatherForecast
            ]



-- PORTS


port showMap : () -> Cmd msg
