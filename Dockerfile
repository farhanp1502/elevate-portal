FROM node:20

WORKDIR /workspace

COPY package*.json ./

ENV NX_DAEMON=false

# Skip all postinstall scripts (including Nx's)
RUN npm ci --legacy-peer-deps --ignore-scripts

COPY . .

RUN npm install -g pm2 \
  && npx nx run-many --target=build --projects=shikshagraha-app,registration,content,players

EXPOSE 3000 4300 4301 4108

CMD ["pm2-runtime", "ecosystem.config.js"]
