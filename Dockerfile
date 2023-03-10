FROM --platform=linux/amd64 node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6969

CMD ["node", "server"]
