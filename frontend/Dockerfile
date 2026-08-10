FROM node:20-alpine
WORKDIR /app 
COPY package*.json ./
COPY ./common/package*.json ./common/
COPY ./frontend/package*.json ./frontend/
RUN npm config set registry https://registry.npmmirror.com
RUN npm install --no-audit --no-fund --prefer-offline
COPY ./frontend/ ./frontend/
COPY ./common/ ./common/
WORKDIR /app/frontend
CMD ["npm", "run", "dev"]