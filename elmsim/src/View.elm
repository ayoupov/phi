module View exposing (view)

import Action exposing (Msg)
import FormatNumber exposing (format)
import Html exposing (Html, div, ul)
import Html.Attributes exposing (class, id)
import Model exposing (Model)
import View.ChatHeader exposing (viewChatHeader)
import View.ChatMessage exposing (viewChatMessage)
import View.InputFooter exposing (viewInputFooter)


view : Model -> Html Msg
view model =
    div [ class "chat_window" ]
        [ ul [ id "toScroll", class "messages" ]
            (List.map viewChatMessage (List.reverse model.messages))
        , viewChatHeader model
        , viewInputFooter model
        ]
