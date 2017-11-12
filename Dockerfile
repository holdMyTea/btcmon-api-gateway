FROM node:latest

ADD . /app
WORKDIR /app

RUN npm i

ENTRYPOINT npm start

EXPOSE 8080