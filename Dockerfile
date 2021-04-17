FROM node:14.16-alpine

RUN apk --no-cache add --virtual builds-deps build-base python git

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
COPY .env /usr/src/app/

COPY . /usr/src/app/

RUN yarn install

EXPOSE 7777

CMD [ "npm", "run", "start:dev"]
