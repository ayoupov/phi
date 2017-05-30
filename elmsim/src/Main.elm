module Main exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Json.Encode exposing (string)
import Simulation

import Dom.Scroll as Scroll

import Task

main =
  Html.program
    { init = initModel
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


-- MODEL

type alias Model =
  { input : String
  , messages : List ChatMsg
  , simModel : Simulation.Model
  }

type alias ChatMsg =
  { sender : Sender
  , text : String
  }

type Sender = User
            | Bot

initMsg = ChatMsg Bot
  "Welcome to Φ Chat, home of the Φ Chat.. can i take your order?"

initModel : (Model, Cmd Msg)
initModel =
  let
      (simModel, simCmd) = Simulation.init
  in
      (Model "" [initMsg] simModel, Cmd.map SimMsg simCmd)
-- UPDATE

type Msg
  = Input String
  | SendUserChatMsg
  | SendBotChatMsg String
  | NoOp
  | SimMsg Simulation.Msg

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
      noOp = (model, Cmd.none)
      scrollDown = Task.attempt (always NoOp) <| Scroll.toBottom "toScroll"
  in
    case msg of
      NoOp ->
        noOp
      Input newInput ->
        ( { model | input = newInput }, Cmd.none)
      SendUserChatMsg ->
        if
          String.isEmpty model.input
        then
          noOp
        else
          let
            chatMsg = ChatMsg User model.input
          in
            ( { model | input    = ""
                      , messages = (chatMsg :: model.messages)
              }
            , scrollDown
            )
      SendBotChatMsg msgText ->
        ( { model | messages = ((ChatMsg Bot msgText) :: model.messages) }
        , scrollDown
        )
      SimMsg msg ->
        let
            (simModel, cmd) = Simulation.update msg model.simModel
        in
            ( { model | simModel = simModel }
            , Cmd.map SimMsg cmd
            )


-- VIEW
view : Model -> Html Msg
view model =
  div []
    [ div [ class "chat_window" ]
      [ ul [ id "toScroll", class "messages" ]
        (List.map viewChatMsg (List.reverse model.messages))
      ]
    , inputFooter model
    , Html.map SimMsg <| Simulation.view model.simModel
    ]

inputFooter : Model -> Html Msg
inputFooter model =
  div [class "bottom_wrapper clearfix"]
    [ div [ class "message_input_wrapper"]
          [ input [ class "message_input"
                  , onEnter SendUserChatMsg
                  , onInput Input
                  , value model.input
                  ] [] ]
    , div [class "send_message", onClick SendUserChatMsg]
          [ div [class "icon"] []
          , div [class "text"] [text "Send"]
          ]
    ]

sender_class : Sender -> String
sender_class sender =
  case sender of
    User -> "user-sent"
    Bot -> "bot-sent"

viewChatMsg : ChatMsg -> Html msg
viewChatMsg msg =
  li [ class <| "message " ++ (sender_class msg.sender) ++ " appeared" ]
      [ div [ class "text_wrapper" ]
            [ div [ class "text" ] [text msg.text] ]
      ]

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
