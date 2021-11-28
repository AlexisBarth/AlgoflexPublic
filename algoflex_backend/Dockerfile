FROM node:latest

# Create app directory
WORKDIR /usr/src/app

ADD . /usr/src/app

RUN npm install --force

CMD [ "npm", "run", "start" ]