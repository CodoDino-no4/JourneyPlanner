# syntax=docker/dockerfile:1
   
FROM node:18-bullseye-slim
WORKDIR /client
COPY ./package.json .
COPY ./public ./public
COPY ./src ./src
COPY ./cypress ./cypress
COPY tsconfig.json .
COPY cypress.config.ts .
RUN apt-get update && \
  apt-get install --no-install-recommends -y \
  libgtk2.0-0 \
  libgtk-3-0 \
  libnotify-dev \
  libgconf-2-4 \
  libgbm-dev \
  libnss3 \
  libxss1 \
  libasound2 \
  libxtst6 \
  procps \
  xauth \
  xvfb
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]

# docker build . -t docker-server
# docker run -dp 3001:3001 docker-server