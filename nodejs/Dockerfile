FROM node:latest as builder

COPY package.json ./
COPY package-lock.json ./

RUN yarn install

FROM node:latest
WORKDIR /app
COPY --from=builder node_modules node_modules
COPY . .

EXPOSE 3000