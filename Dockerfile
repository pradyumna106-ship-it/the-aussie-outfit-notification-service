FROM node:20-alpine

WORKDIR /the-aussie-outfit-notification-service

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5004

CMD ["npm", "start"]