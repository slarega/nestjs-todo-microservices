FROM node

WORKDIR /usr/TODO/project-service

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/main"]