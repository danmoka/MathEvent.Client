FROM node:14-alpine3.15 as build
WORKDIR /app

COPY package.json /app/package.json
RUN npm install --only=prod
COPY . /app
RUN npm run build

FROM nginx:1.21.4-alpine
COPY --from=build /app/dist /app
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]