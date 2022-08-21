FROM node:14.20.0 AS build-step

WORKDIR /build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build