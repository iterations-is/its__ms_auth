FROM node:16-alpine as builder

# Dependencies Image Part
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

# Application Image Part
COPY . /app
RUN yarn build

FROM node:16-alpine as runner
WORKDIR /app

COPY --from=builder /app/.env.production ./.env
COPY --from=builder /app/build .
EXPOSE ${MS_EXPRESS_PORT}

CMD ["node", "/app/main.js"]
