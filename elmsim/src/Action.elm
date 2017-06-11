module Action exposing (Msg(..))

import Simulation.Model exposing (GeneratorType, Peer, SimGenerator, TransmissionLine, Weather)
import Chat.Model exposing (BotChatItem)


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
    | UpdateWeather Weather
    | CallTurn
    | Tick Int
    | DaySummary
