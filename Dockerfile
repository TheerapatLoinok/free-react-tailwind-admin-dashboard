FROM node:20

ENV PORT 3000

RUN npm i npm@latest -g

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app

RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "start"
