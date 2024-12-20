# Use the official Node.js image.
FROM node:14

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY build/ build/

# Your app binds to port 3000
EXPOSE 3000

# Run the web service on container startup.
CMD [ "npx", "serve", "-s", "build" ]