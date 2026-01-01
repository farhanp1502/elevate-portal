FROM node:20

WORKDIR /workspace

COPY package*.json ./

ENV NX_DAEMON=false
ENV CI=true
ENV NODE_ENV=production
ENV NX_PARALLEL=1

# Install dependencies
RUN npm ci --legacy-peer-deps --ignore-scripts

COPY . .

# Build projects - reduce parallelization for ARM64 stability
RUN npm install -g pm2 \
  && npx nx reset \
  && npx nx run-many \
    --target=build \
    --projects=shikshagraha-app,registration,content,players \
    --parallel=1 \

EXPOSE 3000 4300 4301 4108

CMD ["pm2-runtime", "ecosystem.config.js"]