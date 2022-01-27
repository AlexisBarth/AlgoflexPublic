FROM node:latest

# Create app directory
WORKDIR /usr/src/app

ENV NODE_OPTIONS --openssl-legacy-provider

COPY package.json ./

ADD . /usr/src/app

RUN npm install

EXPOSE 3000
CMD [ "npm", "start"]