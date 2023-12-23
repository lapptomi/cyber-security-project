FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma db push

RUN npx prisma db seed

CMD ["npm", "run", "dev"]