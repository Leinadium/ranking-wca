FROM node:22-alpine AS builder
WORKDIR /app
COPY ../front/package*.json .

RUN npm i -g pnpm
RUN pnpm install

COPY ../front/ .
RUN pnpm run build
RUN pnpm prune --production

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY ../front/package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD [ "node", "build" ]