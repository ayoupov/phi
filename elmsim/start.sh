#!/bin/sh

cd $(dirname "$0") && elm-live src/Main.elm --output=public/js/elm.js --dir=public --open
