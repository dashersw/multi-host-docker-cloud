FROM node:7-alpine

WORKDIR /app

ADD package.json .
RUN npm install

ADD . .
