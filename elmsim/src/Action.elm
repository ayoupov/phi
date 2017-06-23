module Action exposing (Msg(..))

import Chat.Model exposing (BotChatItem, MultiChoiceAction, UserChatMessage)
import Material
import Simulation.Model exposing (GeneratorType, Peer, SearchRadius, SimGenerator, TransmissionLine, Weather)
import Simulation.SimulationInterop exposing (AnimationPhase)


type Msg
    = Input String
    | SendUserChatMsg
    | SendBotChatItem BotChatItem
    | NoOp
    | CheckWeather
    | CheckBudget
    | DescribeNode Int
    | RequestConvertNode Int
    | RequestNewLine Int Int
    | AddGenerator SimGenerator
    | AddPeer Peer
    | AddGeneratorWithEdges SearchRadius SimGenerator
    | AddPeerWithEdges SearchRadius Peer
    | AddEdge TransmissionLine
    | RenderPhiNetwork
    | AnimateGeneration
    | AnimatePeerConsumption
    | AnimateTrade
    | AnimationFinished AnimationPhase
    | ToggleBuildMode Bool
    | UpdateWeather Weather
    | CallTurn
    | DaySummary
    | MultiChoiceMsg MultiChoiceAction
    | ToggleInputType
    | Mdl (Material.Msg Msg)
    | SendToEliza UserChatMessage
