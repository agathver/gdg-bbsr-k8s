FROM node:alpine

EXPOSE 3000

ENV NODE_ENV=production

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

CMD npm start