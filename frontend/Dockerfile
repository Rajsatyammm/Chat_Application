FROM node

WORKDIR /usr/frontend-app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 5173:5173

CMD [ "npm", "run", "dev" ]