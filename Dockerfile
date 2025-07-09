# Use the official Node.js runtime as the base image
FROM node:18-alphine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your app runs
EXPOSE 3000

# Define the command to run your application
CMD ["node", "index.js"]