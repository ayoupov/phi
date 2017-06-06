module Main exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http
import Json.Decode as Json
import Json.Encode exposing (string, encode)
import Simulation.Simulation as Simulation
import Simulation.Encoder exposing (encodeNodeLabel)
import Graph
import Update.Extra exposing (..)

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
  | CheckWeather
  | NextDay
  | DescribeNode Int

parseUserMessage : ChatMsg -> Msg
parseUserMessage chatMsg =
  if not (String.startsWith "/" chatMsg.text) then
    SendBotChatMsg
    """Sorry, I only respond to commands! Current available ones are:

/weather (i tell you abt the weather today)
/turn (i move to the next day)
/describe [nodeId] (i tell you some info about a specific node)
"""
  else if chatMsg.text == "/weather" then
    CheckWeather
  else if chatMsg.text == "/turn" then
    NextDay
  else if String.startsWith "/describe" chatMsg.text then
    String.split " " chatMsg.text
    |> (List.head << List.drop 1)
    |> Maybe.andThen (Result.toMaybe << String.toInt)
    |> Maybe.map DescribeNode
    |> Maybe.withDefault (SendBotChatMsg "I can't find that node!")
  else
    NoOp

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  let
      noOp = model ! []
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
            newModel =
              { model | input    = ""
                      , messages = (chatMsg :: model.messages)
              }
          in
            (newModel, scrollDown)
            |> andThen update (parseUserMessage chatMsg)
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
      CheckWeather ->
        let
          sunny = toString model.simModel.weather.sun
          windy = toString model.simModel.weather.wind
          txt = "There's " ++ sunny ++ " amount of sun, " ++
            "and " ++ windy ++ " amount of wind"
        in
          update (SendBotChatMsg txt) model
      NextDay ->
        let
          simModel = model.simModel
          newNetwork =
            simModel.network
            |> Simulation.joulesToGenerators simModel.weather
            |> Simulation.distributeGeneratedJoules
          newSimModel = { simModel | network = newNetwork }
        in
          { model | simModel = newSimModel } ! []
      DescribeNode n ->
        model
        |>
        ( Graph.get n model.simModel.network
          |> Maybe.map (.node >> .label >> encodeNodeLabel)
          |> Maybe.withDefault (string "Node not found :(")
          |> encode 4
          |> SendBotChatMsg
          |> update
        )


-- VIEW
view : Model -> Html Msg
view model =
  div []
    [ div [ class "chat_window" ]
      [ ul [ id "toScroll", class "messages" ]
        (List.map viewChatMsg (List.reverse model.messages))
      ]
    , Html.map SimMsg <| Simulation.view model.simModel
    , inputFooter model
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

senderClass : Sender -> String
senderClass sender =
  case sender of
    User -> "user-sent"
    Bot -> "bot-sent"

viewChatMsg : ChatMsg -> Html msg
viewChatMsg msg =
  li [ class <| "message " ++ (senderClass msg.sender) ++ " appeared" ]
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
