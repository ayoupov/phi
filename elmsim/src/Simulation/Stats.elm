module Simulation.Stats exposing (..)

import Graph
import ListHelpers exposing (takeFirstElementWithDefault0)
import Simulation.Helpers exposing (toPeer)
import Simulation.Model exposing (..)
import Tuple exposing (first, second)


peerCount : PhiNetwork -> Int
peerCount network =
    let
        reducer node sum =
            case node.label of
                PeerNode _ ->
                    1 + sum

                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0


wtCount : PhiNetwork -> Int
wtCount network =
    let
        reducer node sum =
            case node.label of
                GeneratorNode gen ->
                    case gen.generatorType of
                        WindTurbine ->
                            1 + sum

                        _ ->
                            sum

                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0


spCount : PhiNetwork -> Int
spCount network =
    let
        reducer node sum =
            case node.label of
                GeneratorNode gen ->
                    case gen.generatorType of
                        SolarPanel ->
                            1 + sum

                        _ ->
                            sum

                _ ->
                    sum
    in
    Graph.nodes network
        |> List.foldr reducer 0


health : PhiNetwork -> Float
health network =
    let
        reducer : Peer -> ( Float, Float ) -> ( Float, Float )
        reducer peer tup =
            ( takeFirstElementWithDefault0 peer.joules.actualConsumption + first tup
            , peer.joules.desiredConsumption + second tup
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
        |> List.filterMap toPeer
        |> List.foldr reducer ( 0, 0 )
        |> tupleToFraction


communityCoverage : PhiNetwork -> Float
communityCoverage network =
    toFloat (peerCount network) / 156
