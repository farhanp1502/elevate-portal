FROM node:20 AS base
WORKDIR /workspace

# Install system dependencies that might be needed
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Build stage with all dependencies
FROM base AS builder

COPY package*.json ./

ENV NX_DAEMON=false
ENV NX_CACHE_DIRECTORY=/tmp/.nx-cache
ENV CI=true

# Install ALL dependencies (including devDependencies)
# This ensures everything in package.json is installed
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps

COPY . .

# Build projects in parallel
RUN npx nx reset && \
    npx nx run-many \
      --target=build \
      --projects=shikshagraha-app,registration,content,players \
      --parallel=4

# Production stage
FROM node:20 AS runner
WORKDIR /workspace

ENV NODE_ENV=production
ENV NX_DAEMON=false

# Install PM2 globally
RUN npm install -g pm2

# Copy node_modules with ALL dependencies from builder
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/package*.json ./
COPY ecosystem.config.js ./

EXPOSE 3000 4300 4301 4108

CMD ["pm2-runtime", "ecosystem.config.js"]