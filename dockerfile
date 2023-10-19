# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /src

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port the app runs on (adjust if needed)
EXPOSE 3000

# Start the Next.js application in production mode
CMD [ "npm", "run", "dev" ]