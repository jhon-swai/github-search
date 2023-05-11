FROM node:alpine as build-step

RUN mkdir /src
WORKDIR /src

COPY package*.json /src

COPY . /src
ENV NODE_ENV=production

RUN npm config set strict-ssl false

RUN npm install --production

RUN npm run build

#Run Steps
FROM nginx:latest

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build-step /src/build .

COPY nginx/nginx.conf /etc/nginx/conf.d


EXPOSE 3000

# ENTRYPOINT ['nginx','-g','daemon off;']
CMD ["nginx", "-g", "daemon off;"]
