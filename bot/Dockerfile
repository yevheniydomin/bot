FROM node:16-alpine

WORKDIR /usr/local/app

RUN mkdir -p /usr/local/app

COPY ./package*.json /usr/local/app/

RUN npm install

COPY . .

CMD ["npm", "run", "start"]