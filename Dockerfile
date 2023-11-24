# Stage 1: Build Angular app
FROM node:latest as build

WORKDIR /app

COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

RUN npm install

COPY . .

RUN ng build --configuration=production

# Stage 2: Create a minimal Nginx image to serve the Angular app
FROM nginx:alpine

COPY --from=build /app/dist/todo-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
