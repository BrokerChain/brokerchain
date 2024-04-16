#!/bin/bash

set -e

docker build --tag brokerchain-1.0.0-image .
docker run --name brokerchain-1.0.0-container brokerchain-1.0.0-image
docker cp brokerchain-1.0.0-container:/cloud/brokerchain-1.0.0.tar.gz ./

docker container rm brokerchain-1.0.0-container
docker image rm brokerchain-1.0.0-image

mkdir output && tar zxvf brokerchain-1.0.0.tar.gz -C ./output/
mv brokerchain-1.0.0.tar.gz ./output/