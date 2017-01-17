FROM node:7-alpine

WORKDIR /app

RUN apk add --update tini

ENTRYPOINT ["/sbin/tini", "--"]

ADD . .
