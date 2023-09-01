FROM node:18.16.0 as builder
# FROM node:18.16.0-alpine as builder
# RUN apk add --no-cache libc6-compat

ENV NODE_ENV build
USER node

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --frozen-lockfile

COPY --chown=node:node . . 

RUN yarn build
RUN yarn --frozen-lockfile --production && yarn cache clean

USER node

FROM node:18.16.0-alpine as runner

WORKDIR /app
# FROM node:18.16.0-alpine as runner
# RUN apk add --no-cache libc6-compat

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/node_modules ./node_modules

USER node

RUN ls -la

CMD [ "node", "dist/src/main.js" ]