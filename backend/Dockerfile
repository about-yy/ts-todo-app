FROM node:18-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /app
COPY "./app/package.json" "/app/"
RUN npm install
EXPOSE 3001