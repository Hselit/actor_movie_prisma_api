# ---------- STAGE 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
#  Compile TypeScript
RUN npx tsc

# ---------- STAGE 2: Run ----------
FROM node:18-alpine

WORKDIR /app

# Only copy compiled JS + node_modules from builder
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

CMD ["node", "dist/bin/www.js"]


# larger sized image

# FROM node:18
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . . 
# EXPOSE 3000
# CMD ["npx","tsx","./src/bin/www.ts"]

# # RUN npx tsc
# # EXPOSE 3000
# # CMD ["node", "dist/bin/www.js"]