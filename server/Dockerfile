FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma db push

CMD ["npm", "run", "dev"]