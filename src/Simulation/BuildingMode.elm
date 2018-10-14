port module Simulation.BuildingMode exposing (..)

import Action exposing (Msg(..))
import Chat.Helpers exposing (delayMessage)
import Chat.Model exposing (BotChatItem(BotMessage))
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Json.Decode as Decode
import Json.Encode exposing (Value)
import ListHelpers exposing (addToFirstElement, takeFirstElementWithDefault0)
import Model exposing (Model)
import Simulation.GraphUpdates exposing (addEdge, createEdge)
import Simulation.Helpers exposing (getCoords)
import Simulation.Init.Generators as Generators
import Simulation.Model exposing (..)
import Debug

-- PORTS


port changeBuildMode : String -> Cmd msg


port requestConvertNode : (Value -> msg) -> Sub msg


port requestNewLine : (Value -> msg) -> Sub msg


type alias NodeRequest = { id : NodeId, isUpgrade : Bool }

req : Decode.Decoder NodeRequest
req =
  Decode.map2 NodeRequest
    (Decode.field "id" Decode.int)
    (Decode.field "isUpgrade" Decode.bool)

parseConvertNodeRequest : Value -> Msg
parseConvertNodeRequest x =
    let
        result =
            Decode.decodeValue req x
    in
    case result of
        Ok req ->
            RequestConvertNode req.id req.isUpgrade

        Err _ ->
            Debug.log (toString x) NoOp


parseConvertNewLine : Value -> Msg
parseConvertNewLine x =
    let
        result =
            Decode.decodeValue (Decode.list Decode.int) x
    in
    case result of
        Ok list ->
            case list of
                head :: tail ->
                    let
                        first =
                            Debug.log "first" head

                        second =
                            Debug.log "second" (takeFirstElementWithDefault0 tail)
                    in
                    RequestNewLine first second

                _ ->
                    NoOp

        Err _ ->
            NoOp


handleConvertNode : NodeId -> Bool -> Model -> ( Model, Cmd Msg )
handleConvertNode nodeId isUpgrade model =
    let
        networkWithoutOldNode =
            Graph.remove nodeId model.network

        maybeNodeLabel =
            Graph.get nodeId model.network
                |> Maybe.map (.node >> .label)

        nodeGenerator : NodeLabel -> Maybe ( Cmd Msg, ( PotentialNodeType, Phicoin ) )
        nodeGenerator nodeLabel =
            let
                coords =
                    getCoords nodeLabel
            in
            if isUpgrade then
                Debug.log "resilient" Just ( Generators.upgradeHousing UpgradeHousing coords, ( PotentialResilientHousing, 200 ) )
            else
                case nodeLabel of
                    PotentialNode potential ->
                        case potential.nodeType of
                            PotentialWPS ->
                                Debug.log "wps" Just ( Generators.generateWPS AddGenerator coords, ( PotentialWPS, 300 ) )

                            PotentialHousing ->
                                Debug.log "housing" Just ( Generators.generateHousing AddHousing coords, ( PotentialHousing, 200 ) )

                            PotentialResilientHousing ->
                                -- not really getting here
                                Debug.log "resilient" Just ( Generators.upgradeHousing UpgradeHousing coords, ( PotentialResilientHousing, 200 ) )

                            PotentialNothing ->
                                Debug.log "nothing" Nothing

                    _ ->
                        Debug.log "nothing" Nothing

        cmdTuple =
            maybeNodeLabel
                |> Maybe.andThen nodeGenerator

        cmd =
            cmdTuple
                |> Maybe.map Tuple.first
                |> Maybe.withDefault Cmd.none

        cost : Phicoin
        cost =
            cmdTuple
                |> Maybe.map Tuple.second
                |> Maybe.map Tuple.second
                |> Maybe.withDefault 0

        item : PotentialNodeType
        item =
            cmdTuple
                |> Maybe.map Tuple.second
                |> Maybe.map Tuple.first
                |> Maybe.withDefault PotentialNothing

        itemToMessage : PotentialNodeType -> Phicoin -> String
        itemToMessage t c =
            case t of
                PotentialWPS ->
                    "You purchased a water purificator, it costs Φ" ++ toString c ++ " which has been deducted from your budget"

                PotentialResilientHousing ->
                    "You upgraded housing to a resilient one, it costs Φ" ++ toString c ++ " which has been deducted from your budget"

                PotentialHousing ->
                    "You built a housing, it costs Φ" ++ toString c ++ " which has been deducted from your budget"

                PotentialNothing ->
                    ""

        messageCmd : Cmd Msg
        messageCmd =
            case item of
                PotentialNothing ->
                    delayMessage 0 NoOp
                _ ->
                    delayMessage 0 (SendBotChatItem <| BotMessage (itemToMessage item cost))
    in
    { model | network = networkWithoutOldNode, budget = addToFirstElement model.budget -cost } ! [ cmd, messageCmd ]


handleNewLineRequest : NodeId -> NodeId -> PhiNetwork -> PhiNetwork
handleNewLineRequest a b phiNetwork =
    phiNetwork
        |> addEdge (createEdge a b)
