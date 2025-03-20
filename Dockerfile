FROM node:18-alpine
WORKDIR /app
COPY package*.json ./

# Instalação de dependências de produção
RUN npm ci

COPY . .

# Build da aplicação
RUN npm run build

EXPOSE 3000

# Comando para executar em produção
CMD ["npm", "start"]