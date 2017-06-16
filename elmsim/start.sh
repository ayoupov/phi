#!/bin/sh

cd $(dirname "$0") && elm-live src/Main.elm --output=js/elm.js --open
