FROM node:alpine

WORKDIR /app

# Look for the dependencies that are needed for this application.
COPY package*json ./

# Clean install the dependencies.
RUN npm install --force

# Copy everything in our current directory into the current directory on container (./)
COPY . . 

# Port where the BackEnd runs
EXPOSE 3000

# Start the server
CMD ["index.js"]