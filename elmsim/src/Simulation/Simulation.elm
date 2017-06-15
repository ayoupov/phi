port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import Simulation.Model exposing (..)
import Simulation.SimulationHelpers exposing (takeFirstElementWithDefault0, takeFirstElementWithDefault1)
import Svg exposing (..)
import Svg.Attributes as SVG
import Update.Extra exposing (andThen)


-- UPDATE


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


networkGeneratedEnergy : PhiNetwork -> KWHour
networkGeneratedEnergy network =
    let
        nodeGeneratedEnergy { label, id } =
            case label of
                GeneratorNode node ->
                    List.head node.dailyGeneration

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeGeneratedEnergy
        |> List.sum

-- update helpers

setActualConsumption : List KWHour -> PeerJoules -> PeerJoules
setActualConsumption ac joules =
    { joules | actualConsumption = ac }

setStoredJoules : List KWHour -> PeerJoules -> PeerJoules
setStoredJoules sjl joules =
    { joules | storedJoules = sjl }

asActualConsumptionIn : PeerJoules -> List KWHour -> PeerJoules
asActualConsumptionIn =
    flip setActualConsumption

setJoules : PeerJoules -> Peer -> Peer
setJoules newJoules peer =
    { peer | joules = newJoules }

asJoulesIn : Peer -> PeerJoules -> Peer
asJoulesIn =
    flip setJoules

setNegawatts : List KWHour -> Peer -> Peer
setNegawatts newNW peer =
    { peer | negawatts = newNW }


distributeGeneratedJoules : MapLimit -> ReputationRatio -> PhiNetwork -> PhiNetwork
distributeGeneratedJoules limit ratio network =
    let
        negawattsReward peer quotient =
            quotient * takeFirstElementWithDefault0 peer.negawatts

        seedRating peer quotient =
            quotient * 0

        newReputationRating peer =
            (takeFirstElementWithDefault0 peer.reputation + negawattsReward peer ratio.a + seedRating peer ratio.b) :: peer.reputation

        thisDayReputation peer =
            takeFirstElementWithDefault0 peer.reputation

        networkTotalReputationRating =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map thisDayReputation)
                |> List.sum

        weightening networkDesiredEnergy =
            networkDesiredEnergy / networkTotalReputationRating

        networkDesiredEnergy =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map (.joules >> .desiredConsumption))
                |> List.sum

        newConsumption peer =
            (peer.joules.desiredConsumption
                * networkGeneratedEnergy network
                * takeFirstElementWithDefault1 peer.reputation
                * weightening networkDesiredEnergy
                / networkDesiredEnergy
            )
                :: peer.joules.actualConsumption

        newStoredJoules : Peer -> List KWHour
        newStoredJoules peer =
            takeFirstElementWithDefault0 peer.joules.storedJoules
                + Basics.max
                    (takeFirstElementWithDefault0 peer.joules.actualConsumption - peer.joules.desiredConsumption)
                    0
                :: peer.joules.storedJoules

        newNegawatts : Peer -> List KWHour
        newNegawatts peer =
            let
                possibleNW =
                    limit - takeFirstElementWithDefault0 peer.joules.actualConsumption
            in
            (takeFirstElementWithDefault0 peer.negawatts) + Basics.max possibleNW 0 :: peer.negawatts

        -- todo: chain better?
        updateNode node =
            case node of
                PeerNode n ->
                    let
                        k =
                            n.joules
                                |> setActualConsumption (newConsumption n)
                                |> asJoulesIn n
                    in
                    PeerNode
                        (k.joules
                            |> setStoredJoules (newStoredJoules k)
                            |> asJoulesIn k
                            |> setNegawatts (newNegawatts k)
                        )

                _ ->
                    node
    in
    Graph.mapNodes updateNode network



-- PORTS


port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
