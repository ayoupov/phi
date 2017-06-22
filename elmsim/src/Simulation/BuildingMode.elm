port module Simulation.BuildingMode exposing (..)

import Json.Encode as Json
import Graph exposing (Edge, Node, NodeContext, NodeId)
import Simulation.Model exposing (..)

-- PORTS

port enterBuildMode : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg

port exitBuildMode : ( List (Node Json.Value), List EncodedEdge ) -> Cmd msg
