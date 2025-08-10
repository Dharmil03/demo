# Stage 1: Build the React app
FROM node:20

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Build the app
RUN npm run build

# Install vite globally for running preview
RUN npm install -g vite

# Expose port used by vite preview (default 4173)
EXPOSE 4173

# Run vite preview to serve the build
CMD ["vite", "preview", "--host"]
