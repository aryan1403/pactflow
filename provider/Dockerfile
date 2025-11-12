FROM node:18-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "test" ]