FROM node:16

WORKDIR /app

COPY . .

RUN npm i --legacy-peer-deps
RUN npm run build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

WORKDIR /
RUN rm -rf /app