FROM node:14-alpine

WORKDIR /src

COPY . .
RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]
