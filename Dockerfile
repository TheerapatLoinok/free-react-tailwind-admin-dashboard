FROM node:20-alpine

WORKDIR /srv/app

COPY package.json .

RUN npm install -g npm@latest

RUN npm install

COPY . .

RUN chmod 777 vite.config.js

RUN npm install -g vite@latest


RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "start"]