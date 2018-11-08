FROM node:11
MAINTAINER Connor O'Brien

RUN mkdir /node_app
ADD . /node_app

WORKDIR /node_app

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
