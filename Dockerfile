FROM node:latest

ADD ./brokerchain-1.0.0 /cloud/brokerchain-1.0.0

# build
WORKDIR /cloud/brokerchain-1.0.0
RUN npm install
RUN npm run build

# customize
# no customize files, ignore

# pack
WORKDIR /cloud
RUN tar czvf brokerchain-1.0.0.tar.gz brokerchain-1.0.0/