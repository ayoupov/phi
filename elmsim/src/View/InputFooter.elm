module View.InputFooter exposing (viewInputFooter)

import Action exposing (Msg(..))
import Chat.Model
    exposing
        ( BotChatItem(MultiChoiceItem)
        , ChatItem(BotItem)
        , InputType(FreeTextInput, MultiChoiceInput)
        , MultiChoiceAction(McaAddGenerators, McaAddPeers, McaBuyCables, McaRunDay)
        , defaultMcaList
        , mcaName
        )
import Html exposing (Html, div, input, text)
import Html.Attributes exposing (autofocus, class, value)
import Html.Events exposing (keyCode, on, onInput)
import Json.Decode as Json
import Material.Button as Button
import Material.Chip as Chip
import Material.Options as Options
import Model exposing (Model)


viewInputFooter : Model -> Html Msg
viewInputFooter model =
    let
        inputCountainer =
            case model.inputType of
                FreeTextInput ->
                    freeTextFooter model

                MultiChoiceInput ->
                    multiChoiceFooter model
    in
    div [ class "input_footer" ]
        [ multiChoiceFooter model
        , div [ class "input_wrapper" ] [ inputCountainer ]
        ]


multiChoiceFooter : Model -> Html Msg
multiChoiceFooter model =
    let
        toMultiChoiceActionList chatItem =
            case chatItem of
                BotItem botItem ->
                    case botItem of
                        MultiChoiceItem item ->
                            Just item.options

                        _ ->
                            Nothing

                _ ->
                    Nothing

        lastMultiChoiceActionList =
            List.filterMap toMultiChoiceActionList model.messages
                |> List.head
                |> Maybe.withDefault defaultMcaList
    in
    div [ class "mca_container" ]
        (List.map viewMCA lastMultiChoiceActionList)


freeTextFooter : Model -> Html Msg
freeTextFooter model =
    let
        isEnter num =
            case num of
                13 ->
                    SendUserChatMsg

                _ ->
                    NoOp

        onEnter =
            on "keyup" (Json.map isEnter keyCode)
    in
    div [ class "input_container" ]
        [ input
            [ class "message_input"
            , autofocus True
            , onEnter
            , onInput Input
            , value model.input
            ]
            []
        , div [ class "hline" ] []
        , Button.render Mdl
            [ 0 ]
            model.mdl
            [ Button.flat
            , Options.onClick SendUserChatMsg
            , Options.cs "send_button"
            ]
            [ text "Send" ]
        ]


viewMCA : MultiChoiceAction -> Html Msg
viewMCA action =
    Chip.span
        [ Options.cs "multi_button"
        , Options.onClick (MultiChoiceMsg action)
        ]
        [ Chip.text [] <| mcaName action ]
