FROM node:16-alpine

WORKDIR /app
EXPOSE 10000
COPY . /app
CMD ["node", "/app/build/main.js"]
