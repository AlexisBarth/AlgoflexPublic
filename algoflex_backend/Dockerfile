FROM ubuntu

WORKDIR /app
ADD . .

# Install curl, ccls and clang
RUN apt -y update
RUN apt -y install ccls curl clang
RUN mkdir -p "/app/autocomplete" && touch "/app/autocomplete/file.cpp"

# Setup the right node source and install node 14
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -
RUN apt -y install nodejs

# Building and starting the app
RUN npm install
RUN npm run build

EXPOSE 4100

CMD ["npm", "run", "start"]
