module Action exposing (Msg(..))

import Simulation.Model exposing (PVPanel, Peer, TransmissionLine, Weather, WindTurbine)
import Chat.Model exposing (BotChatItem)


type Msg
    = Input String
    | SendUserChatMsg
    | SendBotChatItem BotChatItem
    | NoOp
    | CheckWeather
    | DescribeNode Int
    | AddPVPanel PVPanel
    | AddWindTurbine WindTurbine
    | AddPeer Peer
    | AddEdge TransmissionLine
    | RenderPhiNetwork
    | UpdateWeather Weather
    | CallTurn
    | Tick Int
    | DaySummary
