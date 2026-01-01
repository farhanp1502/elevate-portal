FROM node:20 AS builder

WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

ENV NX_DAEMON=false
ENV CI=true

# Install ALL dependencies
RUN npm ci --legacy-peer-deps

COPY . .

# Build all projects
RUN npx nx reset && \
    npx nx run-many \
      --target=build \
      --projects=shikshagraha-app,registration,content,players \
      --parallel=2

# Production stage - copy entire workspace
FROM node:20-slim

WORKDIR /workspace

ENV NODE_ENV=production

# Install PM2
RUN npm install -g pm2

# Copy entire built workspace (includes all app outputs)
COPY --from=builder /workspace ./

EXPOSE 3000 4300 4301 4108

CMD ["pm2-runtime", "ecosystem.config.js"]