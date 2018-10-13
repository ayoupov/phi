port module Chat.Narrative exposing (..)

import Action exposing (Msg(..), NarrativeElement)
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage, defaultMcaList)
import Html exposing (Html)
import Simulation.Model exposing (PhiNetwork)
import Simulation.Simulation exposing (networkConsumedEnergy, networkGeneratedEnergy, networkStoredEnergy, networkTradedEnergy)
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
    , (MultiChoiceItem <|
        MultiChoiceMessage
            "Please click the location below to launch your simulation."
            [ McaLaunchLjubljana ]
      )
        |> chatWithDelay 2.5 [ ToggleInputAvailable True ]
    ]


siteNarrative : List NarrativeElement
siteNarrative =
    [ initMsg (ToggleInputAvailable False)
    , BotMessage "Dobrodošli v Ljubljano"
        |> chatWithDelay 1 [ ShowMap ]
    , BotMessage "Welcome to Ljubljana, a remote off-grid community located in southeast Russian region with great potential for solar power."
        |> chatWithDelay 1 [ UpdateSiteName "Ljubljana", UpdateSitePopulation 280310, IncrementDayCount ]
    , (BotMessage <|
        "You've received a Φ10,000 investment to further develop the renewable energy network in Ljubljana."
      )
        |> chatWithDelay 3 [ InitializeBudget ]
    , BotMessage
        ("On the map to the right, you'll see the local Phi network in Ljubljana. Phi networks are made up of "
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


daySummary : PhiNetwork -> BotChatItem
daySummary network =
    let
        generatedEnergy =
            floatFmt <| networkGeneratedEnergy network

        totalConsumed =
            floatFmt <| networkConsumedEnergy network

        totalStored =
            floatFmt <| networkStoredEnergy network

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
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaAddWP
            , McaRunDay
            ]


enterBuildModePeers : BotChatItem
enterBuildModePeers =
    let
        text =
            "Click $$_PEER_$$ to add new peers."
                ++ " Next click the button to install cables."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaAddWP
            , McaUpgradeHousing
            , McaRunDay
            ]


enterBuildModeGenerators : BotChatItem
enterBuildModeGenerators =
    let
        text =
            "Click $$_PANEL_$$ to buy new solar panels."
                ++ " Click $$_TURBINE_$$ to buy new wind turbines."
                ++ " Next click the button to install cables."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaRunDay
            ]


enterBuildModeLines : BotChatItem
enterBuildModeLines =
    let
        text =
            "Nodes must be connected to share energy. Click from $$_PEER_$$ to $$_PANEL_$$ or $$_TURBINE_$$ to install distribution cables."
                ++ " Next click the button to go to the next day."
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaAddWP
            , McaRunDay
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
            , McaRunDay
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
            floatFmt <| networkGeneratedEnergy network

        totalStored =
            floatFmt <| networkStoredEnergy network

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
            floatFmt <| networkConsumedEnergy network

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
            floatFmt <| networkTradedEnergy network

        text =
            ""
                ++ totalTraded
                ++ " Joules traded."
    in
    --        BotMessage text
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaBuildHousing
            , McaUpgradeHousing
            , McaAddWP
            , McaRunDay
            ]



-- PORTS


port showMap : () -> Cmd msg
