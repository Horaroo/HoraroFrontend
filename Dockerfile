FROM node:14-alpine as builder

WORKDIR /app

COPY package.json package-lock.json .

RUN yarn install

COPY . .

RUN yarn build

FROM alpine

WORKDIR /app

EXPOSE 3001

COPY --from=builder /usr/src/app/build .

RUN adduser --disabled-password --no-create-home john-doe

USER john-doe

