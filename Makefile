ELM_JS=js/elm.js

build: $(ELM_JS)

$(ELM_JS): $(shell find src/*) elm-package.json
	elm-make src/Main.elm --output public/js/elm.js

deploy: $(ELM_JS)
	aws s3 sync public s3://phi.zone --region us-east-1 --delete

run:
	elm-live src/Main.elm --output=public/js/elm.js --dir=public --open
