FROM node:13.2.0-alpine3.10

WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .