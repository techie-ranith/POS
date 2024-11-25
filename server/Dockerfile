# Use a base image with Node.js
FROM node:alpine

# Set working directory
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port where your Node.js app will run
EXPOSE 4000

# Command to run the application
CMD ["npm", "start"]
