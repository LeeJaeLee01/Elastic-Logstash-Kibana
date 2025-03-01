FROM node:18-alpine

RUN mkdir -p /elk-app

WORKDIR /elk-app

COPY package*.json yarn*.lock ./

RUN yarn install --frozen-lockfile 

COPY . .

CMD ["yarn", "start"]  # Chạy app khi container khởi động
