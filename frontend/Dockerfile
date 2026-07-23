FROM node:20-alpine
WORKDIR /app 
COPY package*.json .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --no-audit --no-fund --prefer-offline
COPY . .
CMD ["npm", "run", "dev"]