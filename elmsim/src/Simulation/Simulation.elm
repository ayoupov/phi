port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import Random exposing (Generator)
import Random.Extra as Random
import Simulation.Model exposing (..)
import Svg exposing (..)
import Svg.Attributes as SVG
import Update.Extra exposing (andThen)


coordsGenerator : Random.Generator Coords
coordsGenerator =
    Random.map2 Coords
        (Random.float (30.5234 - 0.01) (30.5234 + 0.01))
        -- longitude
        (Random.float (50.4501 - 0.01) (50.4501 + 0.01))


generateWeather : Cmd Msg
generateWeather =
    Random.map2 Weather
        (Random.float 0 1)
        (Random.float 0 1)
        |> Random.generate UpdateWeather


generatePVPanel : Cmd Msg
generatePVPanel =
    Random.map4 SimGenerator
        (Random.constant [])
        -- dailyConsumption
        (Random.float 0 10)
        -- maxGeneration
        coordsGenerator
        -- xy coordinates
        (Random.constant SolarPanel)
        -- generator type
        |> Random.generate AddGenerator

generateWindTurbine : Cmd Msg
generateWindTurbine =
    Random.map4 SimGenerator
        (Random.constant [])
        (Random.float 0 10)
        -- capacity
        coordsGenerator
        (Random.constant WindTurbine)
        |> Random.generate AddGenerator

generateEdge : Cmd Msg
generateEdge =
    Random.map2 createEdge
        (Random.int 0 45)
        (Random.int 0 45)
        |> Random.generate AddEdge


createEdge : NodeId -> NodeId -> TransmissionLine
createEdge a b =
    Edge a b (toString a ++ "-" ++ toString b)


generatePeer : Cmd Msg
generatePeer =
    Random.map4 Peer
        (Random.constant [])
        (Random.constant [])
        (Random.float 7 10)
        -- consumptionDesire
        coordsGenerator
        |> Random.generate AddPeer



-- UPDATE


addNode : NodeLabel -> PhiNetwork -> PhiNetwork
addNode nodeLabel network =
    let
        nodeId =
            Maybe.withDefault 0 <|
                Maybe.map ((+) 1 << Tuple.second) (Graph.nodeIdRange network)

        node =
            Node nodeId nodeLabel
    in
    Graph.insert (NodeContext node IntDict.empty IntDict.empty) network


addEdge : TransmissionLine -> PhiNetwork -> PhiNetwork
addEdge edge network =
    Graph.fromNodesAndEdges (Graph.nodes network) (edge :: Graph.edges network)


joulesToGenerators : Weather -> PhiNetwork -> PhiNetwork
joulesToGenerators weather network =
    let
        sun =
            weather.sun

        wind =
            weather.wind

        newDailyGeneration node weatherFactor =
            (node.maxGeneration
                * weatherFactor
            )
                :: node.dailyGeneration

        updateNode node =
            case node of
                GeneratorNode node ->
                    case node.generatorType of
                        SolarPanel ->
                            GeneratorNode { node | dailyGeneration = newDailyGeneration node sun }

                        WindTurbine ->
                            GeneratorNode { node | dailyGeneration = newDailyGeneration node wind }

                _ ->
                    node
    in
    Graph.mapNodes updateNode network


toPeer : Node NodeLabel -> Maybe Peer
toPeer { label, id } =
    case label of
        PeerNode peer ->
            Just peer

        _ ->
            Nothing


distributeGeneratedJoules : PhiNetwork -> PhiNetwork
distributeGeneratedJoules network =
    let
        nodeGeneratedEnergy { label, id } =
            case label of
                GeneratorNode node ->
                    List.head node.dailyGeneration

--                WTNode node ->
--                    List.head node.dailyGeneration

                _ ->
                    Nothing

        networkGeneratedEnergy =
            Graph.nodes network
                |> List.filterMap nodeGeneratedEnergy
                |> List.sum

        networkDesiredEnergy =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map .desiredConsumption)
                |> List.sum

        newConsumption node =
            (node.desiredConsumption
                * networkGeneratedEnergy
                / networkDesiredEnergy
            )
                :: node.dailyConsumption

        updateNode node =
            case node of
                PeerNode n ->
                    PeerNode { n | dailyConsumption = newConsumption n }

                _ ->
                    node
    in
    Graph.mapNodes updateNode network


-- PORTS


port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
