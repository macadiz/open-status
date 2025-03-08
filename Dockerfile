FROM node:22-alpine AS front_build

WORKDIR /app

COPY . .

RUN npm i && npm run build

FROM front_build

WORKDIR /app/server

RUN npm run build

CMD ["node", "dist/main.js"]