FROM node:latest

# Create app directory
WORKDIR /usr/src/app

COPY package.json ./

ADD . /usr/src/app

RUN npm install
RUN mkdir /tmp/algoflex_autocomplete
RUN touch /tmp/algoflex_autocomplete/file.cpp

EXPOSE 3010
CMD [ "npm", "start"]