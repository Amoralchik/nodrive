FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

COPY ./ ./

RUN yarn install --frozen-lockfile --non-interactive

CMD ["yarn", "dev"]
