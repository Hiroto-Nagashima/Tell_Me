FROM node:12.18.0-alpine

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

RUN yarn build

COPY . .

CMD ["yarn", "start"]

EXPOSE 3000 80
