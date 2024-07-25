# Use a Node.js base image for building and serving the Angular project
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose port 4200, the default port for Angular development server
EXPOSE 4200

# Run ng serve for development
CMD ["npm", "start"]
