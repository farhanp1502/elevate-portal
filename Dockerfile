FROM node:20 AS builder

WORKDIR /workspace

COPY package*.json ./

ENV NX_DAEMON=false
ENV CI=true

RUN npm ci --legacy-peer-deps --ignore-scripts

COPY . .

# Build all 4 apps
RUN npx nx reset && \
    npx nx run-many \
      --target=build \
      --projects=shikshagraha-app,registration,content,players \
      --parallel=2

# Production stage
FROM node:20-slim

WORKDIR /workspace

ENV NODE_ENV=production

# Copy everything needed from builder
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/package*.json ./
COPY --from=builder /workspace/apps ./apps
COPY --from=builder /workspace/nx.json ./nx.json

# Expose all ports (though only one will be used per container)
EXPOSE 3000 4300 4301 4108

# Default: Run shikshagraha-app
# Override with docker run command for other apps
WORKDIR /workspace/apps/shikshagraha-app
CMD ["npx", "next", "start", "-p", "3000"]
