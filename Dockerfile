# Use the latest Node.js image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Run the build script
RUN npm run build


RUN npm install -g serve

WORKDIR /usr/src/app/dist

CMD [ "serve","-s" , "."]
