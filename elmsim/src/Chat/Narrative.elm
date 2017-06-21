module Chat.Narrative exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage)
import Html exposing (Html)
import Model exposing (Model)
import Simulation.Simulation exposing (networkConsumedEnergy, networkGeneratedEnergy, networkStoredEnergy)


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
