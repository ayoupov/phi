module Simulation.Stats exposing (..)

import Action exposing (Msg(NoOp))
import Graph
import ListHelpers exposing (takeFirstElementWithDefault0, updateFirstElement)
import Model exposing (Model)
import Simulation.Helpers exposing (toHousing)
import Simulation.Model exposing (..)
import Tuple exposing (first, second)
import Simulation.NodeList exposing (housingList)
import Set as Set


hCount : PhiNetwork -> Int
hCount network =
    let
        reducer node sum =
            case node.label of
                HousingNode _ ->
                    1 + sum

                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0

rhCount : PhiNetwork -> Int
rhCount network =
    let
        reducer node sum =
            case node.label of
                ResilientHousingNode resilient->
                    1 + sum

                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0

wpCount : PhiNetwork -> Int
wpCount network =
    let
        reducer node sum =
            case node.label of
                GeneratorNode gen ->
                    1 + sum
                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0



health : PhiNetwork -> Float
health network =
    let
        reducer : Housing -> ( Float, Float ) -> ( Float, Float )
        reducer housing tup =
            ( takeFirstElementWithDefault0 housing.water.actualConsumption + first tup
            , housing.water.desiredConsumption + second tup
            )

        tupleToFraction : ( Float, Float ) -> Float
        tupleToFraction tuple =
            case tuple of
                ( 0, 0 ) ->
                    0

                _ ->
                    first tuple / second tuple
    in
    Graph.nodes network
        |> List.filterMap toHousing
        |> List.foldr reducer ( 0, 0 )
        |> tupleToFraction

-- todo: change total node count
communityCoverage : PhiNetwork -> Float
communityCoverage network =
    toFloat ((hCount network) + (rhCount network)) / (toFloat (Set.size housingList))


setStats : List Stats -> Model -> Model
setStats newStats model =
    { model | stats = newStats }


asStatsIn : Model -> List Stats -> Model
asStatsIn =
    flip setStats


updateStats : Model -> ( Model, Cmd Msg )
updateStats model =
    let
        updatedStats : List Stats
        updatedStats =
            { health = health model.network, coverage = communityCoverage model.network } :: model.stats

        updatedModel =
            model
                |> setStats updatedStats
    in
    updatedModel ! []


updateStatsThisCycle : Model -> ( Model, Cmd Msg )
updateStatsThisCycle model =
    let
        updatedStats : List Stats
        updatedStats =
            updateFirstElement model.stats { health = health model.network, coverage = communityCoverage model.network }

        updatedModel =
            model
                |> setStats updatedStats
    in
    updatedModel ! []
