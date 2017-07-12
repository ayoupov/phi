module View exposing (view)

import Action exposing (Msg)
import FormatNumber exposing (format)
import Html exposing (Html, div, img, ul)
import Html.Attributes exposing (class, id, src, style)
import Material.Icon as Icon
import Model exposing (Model)
import View.ChatHeader exposing (viewChatHeader)
import View.ChatMessage exposing (viewChatMessage)
import View.InputFooter exposing (viewInputFooter)


assetPreloader : Html Msg
assetPreloader =
    div [ style [ ( "display", "none" ) ] ]
        [ Icon.view "people" [ Icon.size18 ]
        , Icon.view "location_city" [ Icon.size18 ]
        , Icon.view "today" [ Icon.size18 ]
        , img [ src "assets/widget_weather_data.png" ] []
        ]


view : Model -> Html Msg
view model =
    div [ class "chat_window" ]
        [ viewChatHeader model
        , ul [ id "toScroll", class "messages" ]
            (List.map viewChatMessage (List.reverse model.messages))
        , viewInputFooter model
        , assetPreloader
        ]
