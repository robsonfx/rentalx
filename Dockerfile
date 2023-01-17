FROM node:16.16.0-alpine

WORKDIR /usr/app

COPY package.json ./
RUN npm install -g npm@9.1.3
RUN npm install


COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]