port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import Simulation.Model exposing (..)
import Simulation.SimulationHelpers exposing (takeFirstElementWithDefault0, takeFirstElementWithDefault1, takeTailDefaultEmpty)
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


networkStoredEnergy : PhiNetwork -> KWHour
networkStoredEnergy network =
    let
        nodeStoredEnergy { label, id } =
            case label of
                PeerNode node ->
                    List.head node.joules.storedJoules

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeStoredEnergy
        |> List.sum


networkConsumedEnergy : PhiNetwork -> KWHour
networkConsumedEnergy network =
    let
        nodeConsumedEnergy { label, id } =
            case label of
                PeerNode node ->
                    List.head node.joules.actualConsumption

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeConsumedEnergy
        |> List.sum


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


asActualConsumptionIn : PeerJoules -> List KWHour -> PeerJoules
asActualConsumptionIn =
    flip setActualConsumption


setStoredJoules : List KWHour -> PeerJoules -> PeerJoules
setStoredJoules sjl joules =
    { joules | storedJoules = sjl }


asStoredJoulesIn : PeerJoules -> List KWHour -> PeerJoules
asStoredJoulesIn =
    flip setStoredJoules


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
        totalGeneratedEnergy =
            networkGeneratedEnergy network

        weightedNegawatts peer negawattsFactor =
            negawattsFactor * takeFirstElementWithDefault0 peer.negawatts

        weightedSeed peer seedFactor =
            seedFactor * 0

        reputationRating peer =
            1 + weightedNegawatts peer ratio.a + weightedSeed peer ratio.b

        weightConstant =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map (\x -> x.joules.desiredConsumption * reputationRating x))
                |> List.sum
                |> (/) 1

        networkDesiredEnergy =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map (.joules >> .desiredConsumption))
                |> List.sum

        allocatedJoules : Peer -> KWHour
        allocatedJoules peer =
            weightConstant
                * peer.joules.desiredConsumption
                * reputationRating peer
                * totalGeneratedEnergy

        updatePeer : Peer -> Peer
        updatePeer peer =
            let
                myAllocatedJoules =
                    allocatedJoules peer

                joulesForStorage =
                    myAllocatedJoules
                        - peer.joules.desiredConsumption
                        |> Basics.max 0

                newStoredJoules =
                    joulesForStorage + takeFirstElementWithDefault0 peer.joules.storedJoules

                newConsumption =
                    myAllocatedJoules - joulesForStorage

                negawattAllocation =
                    (limit - newConsumption)
                        |> Basics.max 0
            in
            peer.joules
                |> setActualConsumption (newConsumption :: peer.joules.actualConsumption)
                |> setStoredJoules (newStoredJoules :: peer.joules.storedJoules)
                |> asJoulesIn peer
                |> setNegawatts (negawattAllocation :: peer.negawatts)

        updateNode : NodeLabel -> NodeLabel
        updateNode node =
            case node of
                PeerNode peer ->
                    PeerNode <| updatePeer peer

                _ ->
                    node
    in
    network
        |> Graph.mapNodes updateNode


setNegawattsAndStoredJoules : ( List KWHour, List KWHour ) -> Peer -> Peer
setNegawattsAndStoredJoules ( newNW, newSJ ) peer =
    peer.joules
        |> setStoredJoules newSJ
        |> asJoulesIn peer
        |> setNegawatts newNW



--    { peer | negawatts = newNW, storedJoules = newSJ }


setNegawattsAndActualConsumption : ( List KWHour, List KWHour ) -> Peer -> Peer
setNegawattsAndActualConsumption ( newNW, newAC ) peer =
    peer.joules
        |> setActualConsumption newAC
        |> asJoulesIn peer
        |> setNegawatts newNW



--    { peer | negawatts = newNW, actualConsumption = newAC }


maxDesiredTrade : Peer -> Float
maxDesiredTrade peerInNeed =
    peerInNeed.joules.desiredConsumption
        - takeFirstElementWithDefault0 peerInNeed.joules.actualConsumption


tradingPhase : PhiNetwork -> PhiNetwork
tradingPhase network =
    let
        initialPool =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map (.joules >> .storedJoules >> takeFirstElementWithDefault0))
                |> List.sum

        --        currentPool = initialPool
        newDemandChanges : Float -> Peer -> ( List KWHour, List KWHour, Float )
        newDemandChanges pool peer =
            let
                currentNW =
                    takeFirstElementWithDefault0 peer.negawatts

                currentAC =
                    takeFirstElementWithDefault0 peer.joules.actualConsumption

                currentDesired =
                    maxDesiredTrade peer

                -- todo: currentNW is used in actualTradeConsumption!
                actualTradeConsumption =
                    Basics.min pool (Basics.min currentNW currentDesired)

                newPool =
                    pool - actualTradeConsumption
            in
            ( currentNW - actualTradeConsumption :: takeTailDefaultEmpty peer.negawatts
            , currentAC + actualTradeConsumption :: takeTailDefaultEmpty peer.joules.actualConsumption
            , newPool
            )

        updateNodeListDemand : Float -> List (Node NodeLabel) -> ( Float, List (Node NodeLabel) )
        updateNodeListDemand pool list =
            case list of
                [] ->
                    ( pool, list )

                x :: xs ->
                    -- take tail and recurse
                    case x.label of
                        PeerNode p ->
                            let
                                ( newPool, updatedNode ) =
                                    updateNodeDemand pool p

                                ( restPool, tail ) =
                                    updateNodeListDemand newPool xs
                            in
                            ( restPool, { x | label = PeerNode updatedNode } :: tail )

                        _ ->
                            updateNodeListDemand pool xs

        updateNodeDemand : Float -> Peer -> ( Float, Peer )
        updateNodeDemand pool peer =
            let
                ( newNW, newAC, newPool ) =
                    newDemandChanges pool peer

                updatedPeer =
                    setNegawattsAndActualConsumption ( newNW, newAC ) peer
            in
            -- ^ should update in graph
            ( newPool, updatedPeer )

        newSupplyChanges : Float -> Peer -> ( List KWHour, List KWHour )
        newSupplyChanges tradeRatio peer =
            let
                currentNW =
                    takeFirstElementWithDefault0 peer.negawatts

                currentSJ =
                    takeFirstElementWithDefault0 peer.joules.storedJoules
            in
            ( currentNW + currentNW * tradeRatio :: takeTailDefaultEmpty peer.negawatts
            , currentSJ - currentSJ * tradeRatio :: takeTailDefaultEmpty peer.joules.storedJoules
            )

        updateNodeSupplyReward : Float -> Peer -> Peer
        updateNodeSupplyReward tradeRatio peer =
            let
                ( newNW, newSJ ) =
                    newSupplyChanges tradeRatio peer

                updatedPeer =
                    setNegawattsAndStoredJoules ( newNW, newSJ ) peer
            in
            updatedPeer

        updateNodeListSupply : Float -> List (Node NodeLabel) -> List (Node NodeLabel)
        updateNodeListSupply tradeRatio list =
            case list of
                [] ->
                    list

                x :: xs ->
                    -- take tail and recurse
                    case x.label of
                        PeerNode p ->
                            let
                                updatedNode =
                                    updateNodeSupplyReward tradeRatio p

                                tail =
                                    updateNodeListSupply tradeRatio xs
                            in
                            { x | label = PeerNode updatedNode } :: tail

                        _ ->
                            updateNodeListSupply tradeRatio xs

        demandNodesFilter : Node NodeLabel -> Bool
        demandNodesFilter { label, id } =
            case label of
                PeerNode peer ->
                    takeFirstElementWithDefault0 peer.joules.actualConsumption
                        - peer.joules.desiredConsumption
                        < 0

                _ ->
                    False

        supplyNodesFilter : Node NodeLabel -> Bool
        supplyNodesFilter { label, id } =
            case label of
                PeerNode peer ->
                    takeFirstElementWithDefault0 peer.joules.actualConsumption
                        - peer.joules.desiredConsumption
                        > 0

                _ ->
                    False

        nodesInDistress =
            List.filter demandNodesFilter (Graph.nodes network)

        supplyNodes =
            List.filter supplyNodesFilter (Graph.nodes network)

        nodeUpdater n foundCtx =
            case foundCtx of
                Just ctx ->
                    Just { ctx | node = n }

                Nothing ->
                    Nothing

        updateNodes : List (Node NodeLabel) -> PhiNetwork -> PhiNetwork
        updateNodes updatedNodeList network =
            case updatedNodeList of
                [] ->
                    network

                node :: tail ->
                    network
                        |> Graph.update node.id (node |> nodeUpdater)
                        |> updateNodes tail

        updateNetwork =
            let
                ( poolLeft, updatedDemandNodes ) =
                    updateNodeListDemand initialPool nodesInDistress

                updatedSupplyNodes =
                    updateNodeListSupply (initialPool - poolLeft) supplyNodes
            in
            network
                |> updateNodes updatedDemandNodes
                |> updateNodes updatedSupplyNodes
    in
    updateNetwork



-- PORTS


port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
