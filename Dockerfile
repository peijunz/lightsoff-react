FROM node:14-alpine
WORKDIR /home/node

COPY package.json ./package.json
RUN npm install --production
# COPY node_modules ./node_modules
COPY src ./src
COPY public ./public
RUN npm run build

CMD ["npx", "serve", "-s", "build/"]
