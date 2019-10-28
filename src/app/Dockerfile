FROM node:11.6.0-alpine AS builder
COPY . ./lus-project
WORKDIR /lus-project
RUN npm i
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /lus-project/dist/test-application/ /usr/share/nginx/html