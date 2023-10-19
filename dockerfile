# Use an official Node.js runtime as the base image
FROM node:18 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lightweight Node.js runtime as the final base image
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the 'build' stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Install production dependencies
RUN npm install --production

# Expose the port the app runs on (adjust if needed)
EXPOSE $PORT

# Start the Next.js application in production mode
CMD [ "npm", "run", "start" ]