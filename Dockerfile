# Stage 1: Build Angular app
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build --prod

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine

COPY --from=build /app/dist/your-angular-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]