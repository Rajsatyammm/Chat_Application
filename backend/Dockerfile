FROM node:22-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 4000:4000

CMD [ "npm", "start" ]