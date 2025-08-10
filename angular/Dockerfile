# Stage 1: Build the Angular app
FROM node:22.14.0-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
COPY . ./
RUN npm run build -- --configuration production

# Stage 2: Run the Angular app in development mode
FROM node:22.14.0-alpine
WORKDIR /app
COPY . ./
RUN npm install -g @angular/cli
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

