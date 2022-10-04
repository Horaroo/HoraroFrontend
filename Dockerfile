FROM node:14-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3001

RUN find . -type f -exec chmod 644 {} \;

RUN find . -type d -exec chmod 755 {} \;

RUN chmod 777 -R node_modules

RUN adduser --disabled-password --no-create-home john-doe

CMD [ "npm", "start" ]

USER john-doe
