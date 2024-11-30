# Use the official Node.js image as a base
FROM node:18-bullseye

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy the rest of the application files
COPY . .

# Expose the default Expo ports
EXPOSE 19000 19001 19002

# Start the Expo server
CMD ["npm", "start"]
