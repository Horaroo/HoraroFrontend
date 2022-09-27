FROM node:14-alpine

WORKDIR /app

COPY package.json .

COPY package-lock.json .
 
RUN npm install && \
	echo 'root:wa%Dj&@!#' | chpasswd && \
    	adduser --disabled-password --no-create-home john-doe && \
	chown john-doe:john-doe /app/node_modules/
 
COPY . .
 
EXPOSE 3000

USER john-doe 

CMD [ "npm", "start" ]
