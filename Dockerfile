FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./

RUN npm ci

RUN npm install -g typescript

COPY . .

RUN npm run build


FROM node:20 AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci

USER root
RUN mkdir -p /app/uploads && chown -R node:node /app/uploads

USER node

COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/db ./db
COPY --chown=node:node --from=builder /app/drizzle.config.ts ./

CMD ["npm", "start"]
