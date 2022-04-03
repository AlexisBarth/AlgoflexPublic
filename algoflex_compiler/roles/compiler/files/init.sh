#!/bin/bash

parse_name=algoflex/parse:1.0
compile_name=algoflex/compile:1.0
execute_name=algoflex/execute:1.0
runner_name=algoflex/runner:1.0

docker build -t $parse_name /etc/algo_scripts/parse

docker build -t $compile_name /etc/algo_scripts/compile

docker build -t $runner_name /etc/algo_scripts/runner

runner=$(docker create $runner_name)

docker start $runner

docker wait $runner

docker cp $runner:runner.out /etc/algo_scripts/execute

docker build -t $execute_name /etc/algo_scripts/execute