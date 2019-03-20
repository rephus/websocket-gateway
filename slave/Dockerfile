FROM node:8.15-alpine as base

WORKDIR /code

RUN npm install socket.io-client

# ---- Dependencies ----
FROM base 

COPY . /code

CMD node app.js