module Action exposing (Msg(..), NarrativeElement)

import Chat.Model exposing (BotChatItem, MultiChoiceAction, UserChatMessage)
import Material
import Simulation.Model exposing (ResilientHousing, Housing, SearchRadius, WaterPurificator, TransmissionLine, Weather)
import Simulation.SimulationInterop exposing (AnimationPhase)


type alias NarrativeElement =
    { timeDelaySec : Float
    , updateMsgs : List Msg
    }


type Msg
    = Input String
    | SendUserChatMsg
    | ProcessNarrative (List NarrativeElement)
    | SendBotChatItem BotChatItem
    | ToggleInputAvailable Bool
    | SetMCAList (List MultiChoiceAction)
    | NoOp
    | ShowMap
    | CheckWeather
    | CheckBudget
    | InitializeNetwork
    | InitializeBudget
    | DescribeNode Int
    | RequestConvertNode Int Bool
    | RequestNewLine Int Int
    | AddGenerator WaterPurificator
    | AddHousing Housing
    | UpgradeHousing ResilientHousing
    | AddGeneratorWithEdges SearchRadius WaterPurificator
    | AddHousingWithEdges SearchRadius Housing
    | AddEdge TransmissionLine
    | RenderPhiNetwork
    | AnimateGeneration
    | AnimateHousingConsumption
    | AnimateTrade
    | AnimationFinished AnimationPhase
    | ChangeBuildMode String
    | UpdateWeather Weather
    | UpdateFloodMap Int
    | CallTurn
    | StatsUpdate
    | UpdateSiteName String
    | UpdateSitePopulation Int
    | IncrementCycleCount
    | DaySummary
    | MultiChoiceMsg MultiChoiceAction
    | Mdl (Material.Msg Msg)
    | SendToEliza UserChatMessage
    | Reload
