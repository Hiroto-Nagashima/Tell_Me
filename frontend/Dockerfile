FROM node:12.18.0-alpine
COPY . /app
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 3000 80
