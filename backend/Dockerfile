FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Ensure uploads directory persists
RUN mkdir -p uploads

EXPOSE 5000

CMD ["node", "server.js"]
