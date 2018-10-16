port module Chat.Narrative exposing (..)

import Action exposing (Msg(..), NarrativeElement)
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage, defaultMcaList)
import Html exposing (Html)
import Simulation.Model exposing (PhiNetwork)
import Simulation.Simulation exposing (networkConsumedWater, networkGeneratedWater, networkStoredWater, networkTradedWater)
import View.Helpers exposing (floatFmt)


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
    , BotMessage "Your interface to peer-to-peer energy."
        |> chatWithDelay 2.25 []
    , BotMessage "I can help you design, simulate, and manage renewable energy resources and biosensors."
        |> chatWithDelay 2.25 []
    ]


aboutHealthNarrative : List NarrativeElement
aboutHealthNarrative =
    [ BotMessage "The Health meter compares the water requested by the Community with the water available."
        |> chatWithDelay 1.5 [ ToggleInputAvailable True ]
    , BotMessage "The Coverage meter compares the size of your Community with the population of the area."
        |> chatWithDelay 2 []
    , BotMessage "Click the button below to load the map."
        |> chatWithDelay 3 []
    ]


getStartedNarrative : List NarrativeElement
getStartedNarrative =
    [ initMsg (ToggleInputAvailable False)
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "Please click the location below to launch your simulation."
            [ McaLaunchBarje ]
      )
        |> chatWithDelay 2.5 [ ToggleInputAvailable True ]
    ]


siteNarrative : List NarrativeElement
siteNarrative =
    [ initMsg (ToggleInputAvailable False)
    , BotMessage "Dobrodošli v Barje"
        |> chatWithDelay 1 [ ShowMap ]
    , BotMessage "Welcome to Barje, a remote off-grid community located in southeast Russian region with great potential for solar power."
        |> chatWithDelay 1 [ UpdateSiteName "Barje", UpdateSitePopulation 10429, IncrementCycleCount ]
    , (BotMessage <|
        "You've received a Φ10,000 investment to further develop the renewable energy network in Barje."
      )
        |> chatWithDelay 3 [ InitializeBudget ]
    , BotMessage
        ("On the map to the right, you'll see the local Phi network in Barje. Phi networks are made up of "
            ++ "four types of components. $$_PEER_$$ peers, $$_PANEL_$$ solar panels, $$_TURBINE_$$ wind turbines, and cables."
        )
        |> chatWithDelay 5 [ InitializeNetwork ]
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "To begin building your network, select from the buttons below."
            defaultMcaList
      )
        |> chatWithDelay 7 [ ToggleInputAvailable True ]
    , BotMessage
        "Don't forget, you can always ask me anything if you have specific questions."
        |> chatWithDelay 3 []
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


cycleSummary : PhiNetwork -> BotChatItem
cycleSummary network =
    let
        generatedWater =
            floatFmt <| networkGeneratedWater network

        totalConsumed =
            floatFmt <| networkConsumedWater network

        totalStored =
            floatFmt <| networkStoredWater network

        text =
            "Daily Briefing: "
                ++ generatedWater
                ++ " water purified."
                ++ totalConsumed
                ++ " water consumed."
                ++ totalStored
                ++ " surplus stored in canisters."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaAddWP
            , McaRunCycle
            ]


enterBuildModeHousing : BotChatItem
enterBuildModeHousing =
    let
        text =
            "Click $$_PEER_$$ to add new housing."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaUpgradeHousing
            , McaAddWP
            , McaRunCycle
            ]

enterBuildModeUpgrade : BotChatItem
enterBuildModeUpgrade =
    let
        text =
            "Click $$_PEER_$$ to make it resilient."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaAddWP
            , McaRunCycle
            ]


enterBuildModeGenerators : BotChatItem
enterBuildModeGenerators =
    let
        text =
            "Click $$_PANEL_$$ to buy new water purificators. "
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaRunCycle
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
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaAddWP
            , McaRunCycle
            ]


cycleBeginning : PhiNetwork -> BotChatItem
cycleBeginning network =
    let
        text =
            "Назвался груздем, полезай в кузов. | The mushroom climbed into the body."
    in
    BotMessage text


cycleGenerated : PhiNetwork -> BotChatItem
cycleGenerated network =
    let
        generatedEnergy =
            floatFmt <| networkGeneratedWater network

        totalStored =
            floatFmt <| networkStoredWater network

        text =
            ""
                ++ generatedEnergy
                ++ " water purified. "
                ++ totalStored
                ++ " surplus stored in canisters."
    in
    BotMessage text


cycleConsumed : PhiNetwork -> BotChatItem
cycleConsumed network =
    let
        totalConsumed =
            floatFmt <| networkConsumedWater network

        text =
            ""
                ++ totalConsumed
                ++ " water consumed."
    in
    BotMessage text


cycleTraded : PhiNetwork -> BotChatItem
cycleTraded network =
    let
        totalTraded =
            floatFmt <| networkTradedWater network

        text =
            ""
                ++ totalTraded
                ++ " water traded."
    in
    --        BotMessage text
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaAddWP
            , McaRunCycle
            ]


-- PORTS


port showMap : () -> Cmd msg
