FROM node

WORKDIR /usr/TODO/api-gateway

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main"]