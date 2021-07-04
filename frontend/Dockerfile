FROM node:16.3-alpine3.11 AS BUILDER

WORKDIR /app

ADD package.json package-lock.json ./

RUN npm install

ADD public ./public

ADD .browserslistrc vue.config.js .prettierrc .eslintrc.js babel.config.js .env.production ./

ADD src ./src

RUN npm run build

FROM node:16.3-alpine3.11

WORKDIR /app

RUN npm i -g serve

COPY --from=BUILDER /app/dist ./

CMD serve -s -l $PORT
