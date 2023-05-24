FROM node:current-alpine3.17
RUN apk update && apk add bash
WORKDIR /root/src
ADD package.json /root/src
RUN npm install
