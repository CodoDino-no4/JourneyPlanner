# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /serverapp
COPY . .
RUN yarn install --production
CMD ["node", "src/server.js"]
EXPOSE 3001