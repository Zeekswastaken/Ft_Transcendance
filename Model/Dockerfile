FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install -g npm
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "nest", "start", "--watch" ]