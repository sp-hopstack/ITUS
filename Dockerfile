# base image
FROM node:14 as build-env
RUN npm install npm@^9.0.0 -g
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM gcr.io/distroless/nodejs:14
WORKDIR /
COPY --from=build-env /app .
CMD ["./index.js"]