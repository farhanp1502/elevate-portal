FROM node:20

WORKDIR /workspace

COPY package*.json ./

ENV NX_DAEMON=false \
    NX_SKIP_NX_CACHE=true \
    NODE_OPTIONS="--max-old-space-size=8192"

# Install dependencies
RUN npm ci --legacy-peer-deps --ignore-scripts

# Install PM2
RUN npm install -g pm2

# Copy source code
COPY . .

# Reset cache
RUN npx nx reset

# Build ONLY shikshagraha-app (Nx automatically builds its dependencies)
RUN npx nx build shikshagraha-app

# Expose only the port for shikshagraha-app
EXPOSE 3000

# Start with PM2
CMD ["pm2-runtime", "ecosystem.config.js"]