port module Chat.ChatLog exposing (logMessage)

import Json.Encode exposing (Value)


port logMessage : Value -> Cmd msg
