FROM node:10

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 7001
CMD [ "npm", "run", "start:prod" ]
