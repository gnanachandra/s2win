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


ENV MONGO_URI="mongodb+srv://admin:admin@realestate.ts6wl1m.mongodb.net/?retryWrites=true&w=majority"
ENV ACCESS_TOKEN_SECRET="95f0fcd7d5374ddf589e56e702ab92e1efcf429f6207d58cdc366a022c30e4ca5212d693bb3ef4b8faf2f88829e2dda77aef662492428857cfb537c1d79eb2ed"
ENV PORT = 5000

WORKDIR /app/server

EXPOSE 5000

CMD ["node","server.js"]
