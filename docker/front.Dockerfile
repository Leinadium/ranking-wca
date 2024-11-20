FROM node:22-alpine AS builder
WORKDIR /app
COPY ./front/package*.json .
RUN npm i -g pnpm
RUN pnpm install
COPY ./front .
RUN pnpm run build

FROM node:22-alpine AS runner-preview
WORKDIR /app
COPY --from=builder /app .
EXPOSE 5173
ENV NODE_ENV=dev
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]