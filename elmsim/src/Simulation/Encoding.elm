module Simulation.Encoding exposing (..)

import Graph exposing (Edge, Graph, Node)
import Json.Encode as Json
import Simulation.Helpers exposing (getCoords)
import Simulation.Model exposing (..)


-- ENCODING


encodeList : (a -> Json.Value) -> List a -> Json.Value
encodeList encoder list =
    Json.list <| List.map encoder list


encodeNodeLabel : NodeLabel -> Json.Value
encodeNodeLabel nodeLabel =
    case nodeLabel of
        GeneratorNode label ->
            Json.object
                [ ( "maxGeneration", Json.float label.maxGeneration )
                , ( "dailyGeneration", encodeList Json.float label.dailyGeneration )
                , ( "pos", encodeCoords label.pos )
                , ( "generatorType", encodeGeneratorType label.generatorType )
                , ( "nodeType", Json.string "generator" )
                ]

        PeerNode label ->
            Json.object
                [ ( "actualConsumption", encodeList Json.float label.joules.actualConsumption )
                , ( "storedJoules", encodeList Json.float label.joules.storedJoules )
                , ( "desiredConsumption", Json.float label.joules.desiredConsumption )
                , ( "negawatts", encodeList Json.float label.negawatts )
                , ( "seedRating", encodeList Json.float label.joules.seedRatingJoules )
                , ( "tradeBalance", encodeList Json.float label.joules.tradeBalance )
                , ( "reputationRating", encodeList Json.float label.reputation )
                , ( "pos", encodeCoords label.pos )
                , ( "nodeType", Json.string "peer" )
                ]

        BatNode label ->
            Json.object
                [ ( "capacity", Json.float label.capacity )
                , ( "storage", Json.float label.storage )
                , ( "pos", encodeCoords label.pos )
                , ( "nodeType", Json.string "battery" )
                ]

        PotentialNode label ->
            let
                nodeTypeString =
                    case label.nodeType of
                        PotentialPeer ->
                            "peer"

                        PotentialGenerator ->
                            "generator"
            in
            Json.object
                [ ( "pos", encodeCoords label.pos )
                , ( "nodeType", Json.string nodeTypeString )
                , ( "isPotential", Json.bool True )
                ]


encodeGeneratorType : GeneratorType -> Json.Value
encodeGeneratorType generatorType =
    case generatorType of
        WindTurbine ->
            Json.string "windTurbine"

        SolarPanel ->
            Json.string "solarPanel"


encodeNode : Node NodeLabel -> Node Json.Value
encodeNode { id, label } =
    Node id (encodeNodeLabel label)


encodeCoords : Coords -> Json.Value
encodeCoords pos =
    Json.object
        [ ( "x", Json.float pos.x )
        , ( "y", Json.float pos.y )
        ]


encodeEdge : PhiNetwork -> TransmissionLine -> Maybe EncodedEdge
encodeEdge graph tLine =
    let
        maybeFrom =
            Maybe.map (getCoords << .label << .node) (Graph.get tLine.from graph)

        maybeTo =
            Maybe.map (getCoords << .label << .node) (Graph.get tLine.to graph)

        maybeLine =
            Maybe.map2 Line maybeFrom maybeTo
    in
    Maybe.map (EncodedEdge tLine) maybeLine


encodeGraph : PhiNetwork -> ( List (Node Json.Value), List EncodedEdge )
encodeGraph graph =
    let
        encodedNodes =
            List.map encodeNode <| Graph.nodes graph

        tLines =
            List.filterMap (encodeEdge graph) <| Graph.edges graph
    in
    ( encodedNodes, tLines )
