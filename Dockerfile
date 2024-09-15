# Use an official Node.js image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Compile TypeScript code
RUN npm run build

# Expose the port
EXPOSE 5001

# Start the app
CMD ["npm", "start"]
