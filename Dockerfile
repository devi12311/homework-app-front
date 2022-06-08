FROM node:12.22.10 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g serve



COPY . .

EXPOSE 3000

CMD ['serve', 'build', '-l', '3000']