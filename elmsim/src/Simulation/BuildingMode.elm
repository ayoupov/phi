port module Simulation.BuildingMode exposing (..)

import Graph exposing (Edge, Node, NodeContext, NodeId)
import Json.Encode as Json
import Simulation.Model exposing (..)


-- PORTS


port enterBuildMode : () -> Cmd msg


port exitBuildMode : () -> Cmd msg
