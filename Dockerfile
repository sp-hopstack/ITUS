# base image
FROM node:14 as build-env
RUN npm install npm@^9.0.0 -g
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm ci
RUN npm run build

FROM gcr.io/distroless/nodejs:14
COPY --from=build-env /app .
CMD ["./dist/index.js"]
