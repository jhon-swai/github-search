FROM node:alpine as build-step

RUN mkdir /src
WORKDIR /src

COPY package.json /src
COPY package-lock.json /src

RUN npm install

COPY . /src
ENV NODE_ENV=production
RUN npm install --production
RUN npm config set strict-ssl false

#Run Steps
FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-step  /src/build  .

EXPOSE 3000 80

# ENTRYPOINT ['nginx','-g','daemon off;']
