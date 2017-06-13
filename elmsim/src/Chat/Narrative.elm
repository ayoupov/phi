module Chat.Narrative exposing (..)

import Action exposing (Msg)
import Chat.Model exposing (BotChatItem(..), MultiChoiceAction(..), MultiChoiceMessage)
import Html exposing (Html)
import Model exposing (Model)
import Simulation.Simulation exposing (networkGeneratedEnergy)


daySummary : Model -> BotChatItem
daySummary model =
    let
        generatedEnergy =
            toString <| networkGeneratedEnergy model.network

        text =
            "Yesterday we have generated "
                ++ generatedEnergy
                ++ " kWh in total, "
                ++ "the community had consumed lots of energy, and some "
                ++ "of has stored in the batteries. Do you want to know more before I go on?"
    in
    MultiChoiceItem <|
        MultiChoiceMessage text
            [ McaWeatherForecast
            , McaRunDay
            , McaChangeDesign
            ]
