# Set the memory limit for Node.js
ARG NODE_OPTIONS=--max_old_space_size=4096

# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

RUN npm run build

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port the app runs on (adjust if needed)
EXPOSE 3000

# Start the Next.js application in production mode
CMD [ "npm", "run", "start" ]