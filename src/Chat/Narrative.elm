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
    , BotMessage "Your interface to decentralized systems."
        |> chatWithDelay 2.25 []
    , BotMessage "Here I can help you design, simulate, and manage clean water resources and resilient to floods infrastructure."
        |> chatWithDelay 2.25 []
    ]


aboutHealthNarrative : List NarrativeElement
aboutHealthNarrative =
    [ BotMessage "You can decide how to spend your investment: on building simple housing [symbol], upgrading it to a resilient one [symbol], or buying WPS [symbol]. But remember, the goal of the simulation is to make the community of Barje resilient to upcoming floods. You can check your simulation performance with the Health and Coverage parameters in the up-left corner. "
        |> chatWithDelay 1.5 [ ToggleInputAvailable True ]
    , BotMessage "The Coverage meter compares the size of your Community with the population of the area."
        |> chatWithDelay 2 []
    , BotMessage "Please click the location below to launch your simulation."
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
    , BotMessage "Welcome to Barje, a southern region of Ljubljana with the unexplored potential of water resources."
        |> chatWithDelay 1 [ UpdateSiteName "Barje", UpdateSitePopulation 10429, IncrementCycleCount ]
    , (BotMessage <|
        "Expecting an upcoming flood you've been given a Φ10,000 investment to construct and further develop the decentralized water management system and resilient to floods housing in Barje area."
      )
        |> chatWithDelay 3 [ InitializeBudget ]
    , BotMessage
        ("On the map to the right, you'll see the map of Barje, where you can start to build a local Phi network. The Phi network is made up of four types of components: "
            ++ " $$_PEER_$$ simple housing, $$_TURBINE_$$ resilient housing and $$_PANEL_$$ Water Purification Stations (WPS)."
        )
        |> chatWithDelay 6 [ InitializeNetwork ]
    , BotMessage
        "You can decide how to spend your investment: on building simple housing $$_PEER_$$, upgrading it to a resilient one $$_TURBINE_$$, or buying WPS $$_PANEL_$$. But remember, the goal of the simulation is to make the community of Barje resilient to upcoming floods. You can check your simulation performance with the Health and Coverage parameters in the up-left corner. "
        |> chatWithDelay 4 []
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "To begin building your network, select from the buttons below. You can also zoom in and out the map."
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
            "Click $$_NEW_PEER_$$ to add new housing."
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
