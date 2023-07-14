FROM node:18.15.0-alpine as tool-web-builder
WORKDIR /srv

COPY package*.json ./
COPY ./packages/web ./packages/web/

RUN npm ci && npm run build -w packages/web

FROM nginx
ARG NODE_ENV=production
EXPOSE 8000
WORKDIR /srv
COPY --from=tool-web-builder /srv/packages/web/dist /srv/dist
COPY packages/web/config/nginx /srv/nginx
COPY packages/web/config/nginx/default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]

