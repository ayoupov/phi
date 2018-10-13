port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import ListHelpers exposing (takeFirstElementWithDefault0, takeFirstElementWithDefault1, takeTailDefaultEmpty)
import Simulation.GraphUpdates exposing (updateNodes)
import Simulation.Helpers exposing (toHousing)
import Simulation.Model exposing (..)
import Svg exposing (..)
import Svg.Attributes as SVG
import Update.Extra exposing (andThen)


-- UPDATE


waterToGenerators : Weather -> PhiNetwork -> PhiNetwork
waterToGenerators weather network =
    let
        water =
            weather.water

        newDailyGeneration node weatherFactor =
            (node.maxGeneration
                * weatherFactor
            )
                :: node.dailyGeneration

        updateNode node =
            case node of
                GeneratorNode node ->
                    GeneratorNode { node | dailyGeneration = newDailyGeneration node water }

                ResilientHousingNode node ->
                    ResilientHousingNode { node | dailyGeneration = newDailyGeneration node water }

                _ ->
                    node
    in
    Graph.mapNodes updateNode network


networkStoredEnergy : PhiNetwork -> Water
networkStoredEnergy network =
    let
        nodeStoredEnergy { label, id } =
            case label of
                HousingNode node ->
                    List.head node.water.storedWater

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeStoredEnergy
        |> List.sum


networkConsumedEnergy : PhiNetwork -> Water
networkConsumedEnergy network =
    let
        nodeConsumedEnergy { label, id } =
            case label of
                HousingNode node ->
                    List.head node.water.actualConsumption

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeConsumedEnergy
        |> List.sum


networkTradedEnergy : PhiNetwork -> Water
networkTradedEnergy network =
    let
        nodeTradedEnergy { label, id } =
            case label of
                HousingNode node ->
                    let
                        balance =
                            List.head node.water.tradeBalance
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


networkGeneratedEnergy : PhiNetwork -> Water
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


setActualConsumption : List Water -> HousingWater -> HousingWater
setActualConsumption ac water =
    { water | actualConsumption = ac }


asActualConsumptionIn : HousingWater -> List Water -> HousingWater
asActualConsumptionIn =
    flip setActualConsumption


setStoredWater : List Water -> HousingWater -> HousingWater
setStoredWater sjl water =
    { water | storedWater = sjl }


asStoredWaterIn : HousingWater -> List Water -> HousingWater
asStoredWaterIn =
    flip setStoredWater


setTradeBalance : List Water -> HousingWater -> HousingWater
setTradeBalance tb water =
    { water | tradeBalance = tb }


setWater : HousingWater -> Housing -> Housing
setWater newWater housing =
    { housing | water = newWater }


asWaterIn : Housing -> HousingWater -> Housing
asWaterIn =
    flip setWater


setStoredWaterAndBalance : ( List Water, List Water ) -> Housing -> Housing
setStoredWaterAndBalance ( newSW, newTB ) housing =
    housing.water
        |> setStoredWater newSW
        |> setTradeBalance newTB
        |> asWaterIn housing

setWaterActualConsumptionAndBalance : ( List Water, List Water ) -> Housing -> Housing
setWaterActualConsumptionAndBalance ( newAC, newTB ) housing =
    housing.water
        |> setActualConsumption newAC
        |> setTradeBalance newTB
        |> asWaterIn housing



-- phases


distributeGeneratedWater : MapLimit -> ReputationRatio -> PhiNetwork -> PhiNetwork
distributeGeneratedWater limit ratio network =
    let
        totalGeneratedEnergy =
            networkGeneratedEnergy network

        weightedNegawatts housing negawattsFactor =
            negawattsFactor * takeFirstElementWithDefault0 housing.negawatts

        weightedSeed housing seedFactor =
            seedFactor * 0

        reputationRating housing =
            1
            --+ weightedNegawatts housing ratio.a + weightedSeed housing ratio.b

        weightConstant =
            Graph.nodes network
                --                |> Debug.log "nodes"
                |> List.filterMap (toHousing >> Maybe.map (\x -> x.water.desiredConsumption * reputationRating x))
                --                |> Debug.log "map"
                |> List.sum
                --                |> Debug.log "sum"
                |> (/) 1

        --                |> Debug.log "wc"
        networkDesiredEnergy =
            Graph.nodes network
                |> List.filterMap (toHousing >> Maybe.map (.water >> .desiredConsumption))
                |> List.sum

        allocatedWater : Housing -> Water
        allocatedWater housing =
            weightConstant
                * housing.water.desiredConsumption
                * reputationRating housing
                * totalGeneratedEnergy

        --                |> Debug.log "aj"
        updateHousing : Housing -> Housing
        updateHousing housing =
            let
                myAllocatedWater =
                    allocatedWater housing

                waterForStorage =
                    myAllocatedWater
                        - housing.water.desiredConsumption
                        |> Basics.max 0

                newStoredWater =
                    waterForStorage + takeFirstElementWithDefault0 housing.water.storedWater

                newConsumption =
                    myAllocatedWater - waterForStorage

            in
            housing.water
                |> setActualConsumption (newConsumption :: housing.water.actualConsumption)
                |> setStoredWater (newStoredWater :: housing.water.storedWater)
                |> asWaterIn housing

        --                |> Debug.log "after allocation "
        updateNode : NodeLabel -> NodeLabel
        updateNode node =
            case node of
                HousingNode housing ->
                    HousingNode <| updateHousing housing

                _ ->
                    node
    in
    network
        |> Graph.mapNodes updateNode


maxDesiredTrade : Housing -> Float
maxDesiredTrade housingInNeed =
    housingInNeed.water.desiredConsumption
        - takeFirstElementWithDefault0 housingInNeed.water.actualConsumption


consumeFromStorage : NodeLabel -> NodeLabel
consumeFromStorage node =
    case node of
        HousingNode housing ->
            let
                actualConsumption =
                    takeFirstElementWithDefault0 housing.water.actualConsumption

                remainingDesiredConsumption =
                    Basics.max 0 <| housing.water.desiredConsumption - actualConsumption

                storedWater =
                    takeFirstElementWithDefault0 housing.water.storedWater

                toConsume =
                    Basics.min remainingDesiredConsumption storedWater
            in
            (actualConsumption + toConsume)
                :: (Maybe.withDefault [] <| List.tail housing.water.actualConsumption)
                |> asActualConsumptionIn housing.water
                |> asWaterIn housing
                |> HousingNode

        _ ->
            node


tradingPhase : PhiNetwork -> PhiNetwork
tradingPhase network =
    let
        getInitialPool =
            Graph.nodes network
                |> List.filterMap (toHousing >> Maybe.map (.water >> .storedWater >> takeFirstElementWithDefault0))
                |> List.sum

        --        currentPool = initialPool
        newDemandChanges : Float -> Housing -> ( List Water, List Water, Float )
        newDemandChanges pool housing =
            let

                currentAC =
                    takeFirstElementWithDefault0 housing.water.actualConsumption

                currentDesired =
                    maxDesiredTrade housing

                actualTradeConsumption =
                    Basics.min pool currentDesired

                newPool =
                    pool - actualTradeConsumption
            in
            ( currentAC + actualTradeConsumption :: takeTailDefaultEmpty housing.water.actualConsumption
            , -actualTradeConsumption :: takeTailDefaultEmpty housing.water.tradeBalance
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
                        HousingNode p ->
                            let
                                ( newPool, updatedNode ) =
                                    updateNodeDemand pool p

                                ( restPool, tail ) =
                                    updateNodeListDemand newPool xs
                            in
                            ( restPool, { x | label = HousingNode updatedNode } :: tail )

                        _ ->
                            updateNodeListDemand pool xs

        updateNodeDemand : Float -> Housing -> ( Float, Housing )
        updateNodeDemand pool housing =
            let
                ( newAC, newTB, newPool ) =
                    newDemandChanges pool housing

                updatedHousing =
                    setWaterActualConsumptionAndBalance ( newAC, newTB ) housing
            in
            ( newPool, updatedHousing )

        newSupplyChanges : Float -> Housing -> ( List Water, List Water )
        newSupplyChanges tradeRatio housing =
            let

                currentSJ =
                    takeFirstElementWithDefault0 housing.water.storedWater
            in
            ( currentSJ - currentSJ * tradeRatio :: takeTailDefaultEmpty housing.water.storedWater
            , currentSJ * tradeRatio :: takeTailDefaultEmpty housing.water.tradeBalance
            )

        updateNodeSupplyReward : Float -> Housing -> Housing
        updateNodeSupplyReward tradeRatio housing =
            let
                ( newSJ, newTB ) =
                    newSupplyChanges tradeRatio housing

                updatedHousing =
                    setStoredWaterAndBalance ( newSJ, newTB ) housing
            in
            updatedHousing

        updateNodeListSupply : Float -> List (Node NodeLabel) -> List (Node NodeLabel)
        updateNodeListSupply tradeRatio list =
            case list of
                [] ->
                    list

                x :: xs ->
                    -- take tail and recurse
                    case x.label of
                        HousingNode p ->
                            let
                                updatedNode =
                                    updateNodeSupplyReward tradeRatio p

                                tail =
                                    updateNodeListSupply tradeRatio xs
                            in
                            { x | label = HousingNode updatedNode } :: tail

                        _ ->
                            updateNodeListSupply tradeRatio xs

        demandNodesFilter : Node NodeLabel -> Bool
        demandNodesFilter { label, id } =
            case label of
                HousingNode housing ->
                    takeFirstElementWithDefault0 housing.water.actualConsumption
                        - housing.water.desiredConsumption
                        < 0

                _ ->
                    False

        supplyNodesFilter : Node NodeLabel -> Bool
        supplyNodesFilter { label, id } =
            case label of
                HousingNode housing ->
                    takeFirstElementWithDefault0 housing.water.storedWater
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
        waterToPhiQuotient =
            150
    in
    (networkTradedEnergy network * waterToPhiQuotient + takeFirstElementWithDefault0 budget) :: budget



-- PORTS


port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateGeneration : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateHousingConsumption : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateTrade : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
