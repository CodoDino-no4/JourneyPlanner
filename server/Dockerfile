# syntax=docker/dockerfile:1
   
FROM node:18-bullseye-slim
WORKDIR /server
COPY ./package.json .
COPY ./src ./src
ENV DB_URI="mongodb+srv://user:Wkw4VkdpXgmSFPx2@cluster0.qt2aw9f.mongodb.net/JourneyPlanner"
ENV PORT=3001
RUN yarn install --production
EXPOSE 3001
CMD ["yarn", "start"]
