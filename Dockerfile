FROM node:20

# Set working directory
WORKDIR /workspace

# Environment variables
ENV NX_DAEMON=false \
    NX_SKIP_NX_CACHE=true \
    NODE_OPTIONS="--max-old-space-size=8192" \
    NPM_CONFIG_PROGRESS=false \
    NPM_CONFIG_LOGLEVEL=warn

# Copy only package files first (better caching)
COPY package*.json ./

# Harden npm for Jenkins / CI networks
RUN npm config set registry https://registry.npmjs.org/ \
 && npm config set fetch-retries 5 \
 && npm config set fetch-retry-factor 2 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm ci --legacy-peer-deps --ignore-scripts

# Install PM2 globally
RUN npm install -g pm2

# Copy full source
COPY . .

# Reset Nx cache
RUN npx nx reset

# Build only required app (deps auto-built)
RUN npx nx build shikshagraha-app

# Expose app port
EXPOSE 3000

# Start app
CMD ["pm2-runtime", "ecosystem.config.js"]