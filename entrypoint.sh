#!/bin/bash

if [ ! -f build/routes.ts ]; then
  mkdir -p build
  touch build/routes.ts
fi

if [ ! -d node_modules ]; then
  yarn
fi

if [ ! -f build/build.js ]; then
  yarn build
fi

eval $1

