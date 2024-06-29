# Use an official Node.js image as a base
FROM node:alpine as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Run the build command
RUN npm run build

# Start a new stage from the base image
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html/dist

# Copy index.html from the source directory
COPY src/index.html /usr/share/nginx/html

# Expose port 80 to the outside world
# EXPOSE 80