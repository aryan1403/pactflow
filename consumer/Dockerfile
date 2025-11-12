FROM node:18-bullseye

WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .

RUN mkdir -p /app/pacts
ENTRYPOINT [ "npm", "test" ]

