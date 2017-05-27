import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Json.Encode exposing (string)

import Dom.Scroll as Scroll

import Task

main =
  Html.program
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Model =
  { input : String
  , messages : List String
  }


init : (Model, Cmd Msg)
init =
  (Model "" [], Cmd.none)
-- UPDATE

type Msg
  = Input String
  | Send
  | NoOp

update : Msg -> Model -> (Model, Cmd Msg)
update msg {input, messages} =
  let noOp = 
    (Model input messages, Cmd.none)
  in
    case msg of
      NoOp ->
        noOp
      Input newInput ->
        (Model newInput messages, Cmd.none)
      Send ->
        if
          String.isEmpty input
        then
          noOp
        else
          ( Model "" (input :: messages)
          , Task.attempt (always NoOp) <| Scroll.toBottom "toScroll"
          )

-- VIEW
view : Model -> Html Msg
view model =
  div []
    [ stylesheetLink "style.css"
    , div [class "chat_window"]
        [ topMenu
        , ul [id "toScroll", class "messages"] (List.map viewMessage (List.reverse model.messages))
        , inputFooter model
        ]
    ]

inputFooter : Model -> Html Msg
inputFooter model =
  div [class "bottom_wrapper clearfix"]
    [ div [ class "message_input_wrapper"]
          [ input [ class "message_input"
                  , onEnter Send
                  , onInput Input
                  , value model.input
                  ] [] ]
    , div [class "send_message", onClick Send]
          [ div [class "icon"] []
          , div [class "text"] [text "Send"]
          ]
    ]

topMenu : Html Msg
topMenu =
  div [ class "top_menu" ]
      [ div [ class "buttons" ]
            [ div [ class "button close" ] []
            , div [ class "button minimize" ] []
            , div [ class "button maximize" ] []
            ]
      , div [ class "title" ] [ text "Φ Chat" ]
      ]

viewMessage : String -> Html msg
viewMessage msg =
  li [ class "message right appeared" ]
      [ div [ class "avatar" ] []
      , div [ class "text_wrapper" ]
            [ div [ class "text" ] [text msg] ]
      ]

stylesheetLink : String -> Html msg
stylesheetLink url =
    node
        "link"
        [ property "rel" (string "stylesheet")
        , property "type" (string "text/css")
        , property "href" (string url)
        ]
        []

onEnter : Msg -> Attribute Msg
onEnter msg =
  let
      isEnter num =
        case num of
          13 -> msg
          _  -> NoOp
  in
      on "keyup" (Json.map isEnter keyCode)


-- SUBSCRIPTIONS

subscriptions : Model -> Sub Msg
subscriptions model =
  Sub.none
