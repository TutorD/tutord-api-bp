SHELL := /bin/bash

GIT_TAG := $(shell git rev-parse --short HEAD 2> /dev/null)
BUILD_TAG := $(if $(BUILD_TAG),$(BUILD_TAG),tutord/tutord-api-bp:$(GIT_TAG))

# Arguments
env ?= dev

init: deps

clean:
	@echo "*** Cleaning Project Directory ***"
	npm run clean:all

deps:
	@echo "*** Installing Deps ***"
	npm install

docker-build:
	@echo "*** Docker Build ***"
	docker build -t $(BUILD_TAG) .

docker-run:
	@echo "*** Docker Run ***"
	docker run -d -p 3001:3001 $(BUILD_TAG)

docker-push:
	@echo "*** Docker Push ***"
	docker push $(BUILD_TAG)

start-dev:
	@echo "*** npm run start ***"
	npm run start

.PHONY: clean test install
.SILENT: docker-build clean deps
