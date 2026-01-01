FROM node:20

WORKDIR /workspace

COPY package*.json ./

ENV NX_DAEMON=false
ENV NX_CACHE_DIRECTORY=/tmp/.nx-cache
ENV CI=true

# Use npm cache mount for faster rebuilds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --legacy-peer-deps --ignore-scripts

COPY . .

# Build with some parallelization
RUN npm install -g pm2 && \
    npx nx reset && \
    npx nx run-many \
      --target=build \
      --projects=shikshagraha-app,registration,content,players \
      --parallel=2

EXPOSE 3000 4300 4301 4108

CMD ["pm2-runtime", "ecosystem.config.js"]