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
                , ( "nodeType", Json.string "wps" )
                ]

        HousingNode label ->
            Json.object
                [ ( "actualConsumption", encodeList Json.float label.water.actualConsumption )
                , ( "storedWater", encodeList Json.float label.water.storedWater )
                , ( "desiredConsumption", Json.float label.water.desiredConsumption )
                , ( "seedRating", encodeList Json.float label.water.seedRatingWater )
                , ( "tradeBalance", encodeList Json.float label.water.tradeBalance )
                , ( "reputationRating", encodeList Json.float label.reputation )
                , ( "pos", encodeCoords label.pos )
                , ( "nodeType", Json.string "housing" )
                ]

        ResilientHousingNode label ->
            Json.object
                [ ( "maxGeneration", Json.float label.maxGeneration )
                , ( "dailyGeneration", encodeList Json.float label.dailyGeneration )
                , ( "actualConsumption", encodeList Json.float label.water.actualConsumption )
                , ( "storedWater", encodeList Json.float label.water.storedWater )
                , ( "desiredConsumption", Json.float label.water.desiredConsumption )
                , ( "seedRating", encodeList Json.float label.water.seedRatingWater )
                , ( "tradeBalance", encodeList Json.float label.water.tradeBalance )
                , ( "reputationRating", encodeList Json.float label.reputation )
                , ( "pos", encodeCoords label.pos )
                , ( "nodeType", Json.string "resilient" )
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
                nodeTypeVal =
                    case label.nodeType of
                        PotentialHousing ->
                            Json.string "housing"

                        PotentialWPS ->
                            Json.string "wps"

                        PotentialResilientHousing ->
                            Json.string "resilient"

            in
            Json.object
                [ ( "pos", encodeCoords label.pos )
                , ( "nodeType", nodeTypeVal )
                , ( "isPotential", Json.bool True )
                ]


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
