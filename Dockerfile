FROM node:20-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev:server"]
