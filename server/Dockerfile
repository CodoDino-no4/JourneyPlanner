# syntax=docker/dockerfile:1
   
FROM node:18-bullseye-slim
WORKDIR /server
COPY ./package.json .
COPY ./src ./src
COPY tsconfig.json .
ENV DB_URI="mongodb+srv://user:Wkw4VkdpXgmSFPx2@cluster0.qt2aw9f.mongodb.net/JourneyPlanner"
ENV PORT=3001
EXPOSE 3001
RUN yarn install
CMD ["yarn", "serve"]
