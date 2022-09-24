SHELL := /bin/bash

local_build:
	docker build . -t local-front
local_up:
	docker run --rm -p 3000:3000 local-front
