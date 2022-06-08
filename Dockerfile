FROM node:16.13-alpine

WORKDIR /app

COPY package.json .

RUN npm install yarn 
RUN yarn install

COPY . .

EXPOSE 8081
EXPOSE 8085

ENV SOCKET_PORT=8085
ENV PORT=8081
ENV MONGO_URL = 'mongodb://mongo:27017'

CMD ["yarn", "start"]