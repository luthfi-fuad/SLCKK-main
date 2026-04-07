# Build Stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package.json ./
# Note: package-lock is ignored in .dockerignore to ensure fresh install if needed, 
# but if you prefer consistency, you can remove it from .dockerignore and copy it here.
# For this project, we'll install dependencies fresh.
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Serve Stage
FROM nginx:stable-alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy images folder to nginx root
COPY --from=build /app/images /usr/share/nginx/html/images

# Use our custom nginx config (proxies /api to backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
