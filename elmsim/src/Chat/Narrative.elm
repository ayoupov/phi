module Chat.Narrative exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage)
import Html exposing (Html)
import Model exposing (Model)
import Simulation.Simulation exposing (networkConsumedEnergy, networkGeneratedEnergy, networkStoredEnergy, networkTradedEnergy)


daySummary : Model -> BotChatItem
daySummary model =
    let
        generatedEnergy =
            toString <| networkGeneratedEnergy model.network

        totalConsumed =
            toString <| networkConsumedEnergy model.network

        totalStored =
            toString <| networkStoredEnergy model.network

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
            , McaChangeDesign
            ]

dayBeginning : Model -> BotChatItem
dayBeginning model =
    let
        text = "Glorious new day in Arstotzka"
        -- add weather?
    in
        BotMessage text

dayGenerated : Model -> BotChatItem
dayGenerated model =
    let
        generatedEnergy =
            toString <| networkGeneratedEnergy model.network

        totalStored =
            toString <| networkStoredEnergy model.network

        text =
            "Today we have generated "
                ++ generatedEnergy
                ++ " kWh in total, "
                ++ totalStored
                ++ " kWh has stored in the batteries."
    in
        BotMessage text

dayConsumed : Model -> BotChatItem
dayConsumed model =
    let
        totalConsumed =
            toString <| networkConsumedEnergy model.network

        text =
                "The community had consumed "
                ++ totalConsumed
                ++ " kWh of energy"
    in
        BotMessage text

dayTraded : Model -> BotChatItem
dayTraded model =
    let
        totalTraded =
            toString <| networkTradedEnergy model.network

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
            , McaChangeDesign
            ]
