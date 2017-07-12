port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import ListHelpers exposing (takeFirstElementWithDefault0, takeFirstElementWithDefault1, takeTailDefaultEmpty)
import Simulation.GraphUpdates exposing (updateNodes)
import Simulation.Helpers exposing (toPeer)
import Simulation.Model exposing (..)
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


networkTradedEnergy : PhiNetwork -> KWHour
networkTradedEnergy network =
    let
        nodeTradedEnergy { label, id } =
            case label of
                PeerNode node ->
                    let
                        balance =
                            List.head node.joules.tradeBalance
                    in
                    if Maybe.withDefault 0 balance > 0 then
                        balance
                    else
                        Nothing

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeTradedEnergy
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



--        |> Debug.log "nge"
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


setTradeBalance : List KWHour -> PeerJoules -> PeerJoules
setTradeBalance tb joules =
    { joules | tradeBalance = tb }


setJoules : PeerJoules -> Peer -> Peer
setJoules newJoules peer =
    { peer | joules = newJoules }


asJoulesIn : Peer -> PeerJoules -> Peer
asJoulesIn =
    flip setJoules


setNegawatts : List KWHour -> Peer -> Peer
setNegawatts newNW peer =
    { peer | negawatts = newNW }


setNegawattsStoredJoulesAndBalance : ( List KWHour, List KWHour, List KWHour ) -> Peer -> Peer
setNegawattsStoredJoulesAndBalance ( newNW, newSJ, newTB ) peer =
    peer.joules
        |> setStoredJoules newSJ
        |> setTradeBalance newTB
        |> asJoulesIn peer
        |> setNegawatts newNW


setNegawattsActualConsumptionAndBalance : ( List KWHour, List KWHour, List KWHour ) -> Peer -> Peer
setNegawattsActualConsumptionAndBalance ( newNW, newAC, newTB ) peer =
    peer.joules
        |> setActualConsumption newAC
        |> setTradeBalance newTB
        |> asJoulesIn peer
        |> setNegawatts newNW



-- phases


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
                --                |> Debug.log "nodes"
                |> List.filterMap (toPeer >> Maybe.map (\x -> x.joules.desiredConsumption * reputationRating x))
                --                |> Debug.log "map"
                |> List.sum
                --                |> Debug.log "sum"
                |> (/) 1

        --                |> Debug.log "wc"
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

        --                |> Debug.log "aj"
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

        --                |> Debug.log "after allocation "
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


maxDesiredTrade : Peer -> Float
maxDesiredTrade peerInNeed =
    peerInNeed.joules.desiredConsumption
        - takeFirstElementWithDefault0 peerInNeed.joules.actualConsumption


consumeFromStorage : NodeLabel -> NodeLabel
consumeFromStorage node =
    case node of
        PeerNode peer ->
            let
                actualConsumption =
                    takeFirstElementWithDefault0 peer.joules.actualConsumption

                remainingDesiredConsumption =
                    Basics.max 0 <| peer.joules.desiredConsumption - actualConsumption

                storedJoules =
                    takeFirstElementWithDefault0 peer.joules.storedJoules

                toConsume =
                    Basics.min remainingDesiredConsumption storedJoules
            in
            (actualConsumption + toConsume)
                :: (Maybe.withDefault [] <| List.tail peer.joules.actualConsumption)
                |> asActualConsumptionIn peer.joules
                |> asJoulesIn peer
                |> PeerNode

        _ ->
            node


tradingPhase : PhiNetwork -> PhiNetwork
tradingPhase network =
    let
        getInitialPool =
            Graph.nodes network
                |> List.filterMap (toPeer >> Maybe.map (.joules >> .storedJoules >> takeFirstElementWithDefault0))
                |> List.sum

        --        currentPool = initialPool
        newDemandChanges : Float -> Peer -> ( List KWHour, List KWHour, List KWHour, Float )
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
            , -actualTradeConsumption :: takeTailDefaultEmpty peer.joules.tradeBalance
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
                ( newNW, newAC, newTB, newPool ) =
                    newDemandChanges pool peer

                updatedPeer =
                    setNegawattsActualConsumptionAndBalance ( newNW, newAC, newTB ) peer
            in
            ( newPool, updatedPeer )

        newSupplyChanges : Float -> Peer -> ( List KWHour, List KWHour, List KWHour )
        newSupplyChanges tradeRatio peer =
            let
                currentNW =
                    takeFirstElementWithDefault0 peer.negawatts

                currentSJ =
                    takeFirstElementWithDefault0 peer.joules.storedJoules
            in
            ( currentNW + currentNW * tradeRatio :: takeTailDefaultEmpty peer.negawatts
            , currentSJ - currentSJ * tradeRatio :: takeTailDefaultEmpty peer.joules.storedJoules
            , currentSJ * tradeRatio :: takeTailDefaultEmpty peer.joules.tradeBalance
            )

        updateNodeSupplyReward : Float -> Peer -> Peer
        updateNodeSupplyReward tradeRatio peer =
            let
                ( newNW, newSJ, newTB ) =
                    newSupplyChanges tradeRatio peer

                updatedPeer =
                    setNegawattsStoredJoulesAndBalance ( newNW, newSJ, newTB ) peer
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
                    takeFirstElementWithDefault0 peer.joules.storedJoules
                        > 0

                _ ->
                    False

        nodesInDistress =
            List.filter demandNodesFilter (Graph.nodes network)

        supplyNodes =
            List.filter supplyNodesFilter (Graph.nodes network)

        updateNetwork =
            let
                initialPool =
                    getInitialPool

                demandList =
                    nodesInDistress

                supplyList =
                    supplyNodes

                tradeRatioValue initialPool actualPool =
                    case initialPool of
                        0 ->
                            0

                        _ ->
                            (initialPool - poolLeft) / initialPool

                ( poolLeft, updatedDemandNodes ) =
                    updateNodeListDemand initialPool demandList

                updatedSupplyNodes =
                    updateNodeListSupply (tradeRatioValue initialPool poolLeft) supplyList
            in
            network
                |> updateNodes updatedDemandNodes
                |> updateNodes updatedSupplyNodes
    in
    updateNetwork


updateBudget : PhiNetwork -> Budget -> Budget
updateBudget network budget =
    let
        joulesToPhiQuotient =
            150
    in
    (networkTradedEnergy network * joulesToPhiQuotient + takeFirstElementWithDefault0 budget) :: budget



-- PORTS


port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateGeneration : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animatePeerConsumption : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateTrade : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
