port module Simulation.Simulation exposing (..)

import Action exposing (Msg(..))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Html.Attributes exposing (..)
import IntDict
import Json.Encode as Json
import List exposing (repeat)
import ListHelpers exposing (takeFirstElementWithDefault0, takeFirstElementWithDefault1, takeTailDefaultEmpty)
import Simulation.GraphUpdates exposing (updateNodes, graphFromNodeList)
import Simulation.Helpers exposing (toHousing,findFlooded)
import Simulation.Model exposing (..)
import Svg exposing (..)
import Svg.Attributes as SVG
import Update.Extra exposing (andThen)

-- UPDATE

processFlood : Weather -> PhiNetwork -> PhiNetwork
processFlood weather network =
    let

        flooded : List (Node NodeLabel)
        flooded =
            findFlooded weather.floodLevel network

        downgradeNode: Node NodeLabel -> Node NodeLabel
        downgradeNode node =
            case node.label of
                HousingNode l ->
                    {node | label = PotentialNode (Potential PotentialHousing  l.pos)}
                _ ->
                    node

        downgradedNetwork =
            flooded
                |> List.map downgradeNode

        nodeUpdater n foundCtx =
            case foundCtx of
                Just ctx ->
                    Just { ctx | node = n }

                Nothing ->
                    Nothing

        updateNetwork : List (Node NodeLabel) -> PhiNetwork -> PhiNetwork
        updateNetwork nodes network =
            case nodes of
                [] -> network

                node :: tail ->
                    network
                    |> Graph.update node.id (node |> nodeUpdater)
                    |> updateNetwork tail
    in
        updateNetwork downgradedNetwork network

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
--                |> Debug.log "ndg"

        updateNode node =
            case node of
                GeneratorNode node ->
                    GeneratorNode { node | dailyGeneration = newDailyGeneration node water }
--                    |> Debug.log "gennode"

                ResilientHousingNode node ->
                    ResilientHousingNode { node | dailyGeneration = newDailyGeneration node water }

                _ ->
                    node
    in
    Graph.mapNodes updateNode network
--    |> Debug.log "watertogen"


networkStoredWater : PhiNetwork -> Water
networkStoredWater network =
    let
        nodeStoredWater { label, id } =
            case label of
                HousingNode node ->
                    List.head node.water.storedWater

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeStoredWater
        |> List.sum


networkConsumedWater : PhiNetwork -> Water
networkConsumedWater network =
    let
        nodeConsumedWater { label, id } =
            case label of
                HousingNode node ->
                    List.head node.water.actualConsumption

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeConsumedWater
        |> List.sum
--        |> Debug.log "consumed"


networkTradedWater : PhiNetwork -> Water
networkTradedWater network =
    let
        nodeTradedWater { label, id } =
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
        |> List.filterMap nodeTradedWater
        |> List.sum

networkGeneratedWater : PhiNetwork -> Water
networkGeneratedWater network =
    let
        nodeGeneratedWater { label, id } =
            case label of
                GeneratorNode node ->
                    List.head node.dailyGeneration

                ResilientHousingNode node ->
                    List.head node.dailyGeneration

                _ ->
                    Nothing
    in
    Graph.nodes network
        |> List.filterMap nodeGeneratedWater
        |> List.sum
--        |> Debug.log "network generated"


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
        totalGeneratedWater =
            networkGeneratedWater network
--            |> Debug.log "total gen water"

        weightedSeed housing seedFactor =
            seedFactor * 0.3

        reputationRating housing =
            1 + weightedSeed housing ratio.b
--            1 + weightedNegawatts housing ratio.a + weightedSeed housing ratio.b

        weightConstant =
--            1
            Graph.nodes network
--                                |> Debug.log "nodes"
                |> List.filterMap (toHousing >> Maybe.map (\x -> x.water.desiredConsumption * reputationRating x))
--                                |> Debug.log "map"
                |> List.sum
--                                |> Debug.log "sum"
                |> (/) 1
--                |> Debug.log "wc"

        networkDesiredEnergy =
            Graph.nodes network
                |> List.filterMap (toHousing >> Maybe.map (.water >> .desiredConsumption))
                |> List.sum
--                |> Debug.log "network desired "

        allocatedWater : Housing -> Water
        allocatedWater housing =
            weightConstant
--                * (Debug.log "hwdc" housing.water.desiredConsumption)
                * housing.water.desiredConsumption
                * totalGeneratedWater
--            |> Debug.log "alloc water"

        updateHousing : Housing -> Housing
        updateHousing housing =
            let
                myAllocatedWater =
                    allocatedWater housing
--                    |> Debug.log "my alloc water"


                waterForStorage =
                    myAllocatedWater
                        - housing.water.desiredConsumption
                        |> Basics.max 0
--                        |> Debug.log "water for storage"

                newStoredWater =
                    waterForStorage + takeFirstElementWithDefault0 housing.water.storedWater
--                    |> Debug.log "new stored water"

                newConsumption =
                    myAllocatedWater - waterForStorage
--                    |> Debug.log "new consumption "

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
                currentSW =
                    takeFirstElementWithDefault0 housing.water.storedWater
            in
            ( currentSW - currentSW * tradeRatio :: takeTailDefaultEmpty housing.water.storedWater
            , currentSW * tradeRatio :: takeTailDefaultEmpty housing.water.tradeBalance
            )

        updateNodeSupplyReward : Float -> Housing -> Housing
        updateNodeSupplyReward tradeRatio housing =
            let
                ( newSW, newTB ) =
                    newSupplyChanges tradeRatio housing

                updatedHousing =
                    setStoredWaterAndBalance ( newSW, newTB ) housing
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
--                    |> Debug.log "initial pool"

                demandList =
                    nodesInDistress

                supplyList =
                    supplyNodes

                tradeRatioValue initialPool actualPool =
                    case initialPool of
                        0 ->
                            0

                        _ ->
                            Basics.max ((initialPool - poolLeft) / initialPool) 0.05
--                            0.01

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
            2
    in
    (networkTradedWater network * waterToPhiQuotient + takeFirstElementWithDefault0 budget) :: budget



-- PORTS


port changeFloodLevel : Int -> Cmd msg

port renderPhiNetwork : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateGeneration : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateHousingConsumption : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg


port animateTrade : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg



-- VIEW
