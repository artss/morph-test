FROM node:18.15.0-alpine
WORKDIR /srv

COPY package*.json ./
COPY ./packages/ws ./packages/ws/

RUN npm ci && npm run build -w packages/ws

EXPOSE 8001
CMD ["npm", "start", "-w", "packages/ws"]
