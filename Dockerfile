# Step 1: Build the app
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the production version
RUN npm run build

# Step 2: Serve the app with a lightweight web server
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
