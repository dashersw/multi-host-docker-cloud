FROM node:7-alpine

WORKDIR /app

ADD package.json .

RUN npm install
RUN npm install -g pm2

RUN apk add --update tini

ENTRYPOINT ["/sbin/tini", "--"]

ADD . .
