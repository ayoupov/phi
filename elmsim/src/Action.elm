module Action exposing (Msg(..))

import Chat.Model exposing (BotChatItem, MultiChoiceAction, UserChatMessage)
import Material
import Simulation.Model exposing (GeneratorType, Peer, SimGenerator, TransmissionLine, Weather)
import Simulation.SimulationInterop exposing (AnimationPhase)


type Msg
    = Input String
    | SendUserChatMsg
    | SendBotChatItem BotChatItem
    | NoOp
    | CheckWeather
    | DescribeNode Int
    | AddGenerator SimGenerator
    | AddPeer Peer
    | AddEdge TransmissionLine
    | RenderPhiNetwork
    | AnimateGeneration
    | AnimatePeerConsumption
    | AnimateTrade
    | AnimationFinished AnimationPhase
    | EnterBuildMode
    | ExitBuildMode
    | UpdateWeather Weather
    | CallTurn
    | DaySummary
    | MultiChoiceMsg MultiChoiceAction
    | ToggleInputType
    | Mdl (Material.Msg Msg)
    | SendToEliza UserChatMessage
