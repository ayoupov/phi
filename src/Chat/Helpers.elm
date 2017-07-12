module Chat.Helpers exposing (delayMessage)

import Process
import Task
import Time


delayMessage : Float -> msg -> Cmd msg
delayMessage timeOut msg =
    Process.sleep (timeOut * Time.second)
        |> Task.perform (\_ -> msg)
