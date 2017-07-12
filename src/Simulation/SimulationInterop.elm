port module Simulation.SimulationInterop exposing (..)


type alias AnimationPhase =
    String


port animationFinished : (AnimationPhase -> msg) -> Sub msg
