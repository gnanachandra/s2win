FROM node:20-alpine3.17

WORKDIR /app

COPY server/package*.json ./server/

RUN cd server && npm install

COPY client/package*.json ./client/

RUN cd client && npm install

COPY ./client ./client
COPY ./server ./server

WORKDIR /app/client

RUN npm run build


ENV MONGO_URI=""
ENV ACCESS_TOKEN_SECRET=""
ENV PORT = 5000

WORKDIR /app/server

EXPOSE 5000

CMD ["node","server.js"]
