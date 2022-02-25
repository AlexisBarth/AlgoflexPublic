#!/bin/bash

parse_name=algoflex/parse:1.0
compile_name=algoflex/compile:1.0
execute_name=algoflex/execute:1.0
runner_name=algoflex/runner:1.0

docker build -t $parse_name ./parse

docker build -t $compile_name ./compile

docker build -t $runner_name ./runner

runner=$(docker create $runner_name)

docker start $runner

docker wait $runner

docker cp $runner:runner.out ./execute

docker build -t $execute_name ./execute