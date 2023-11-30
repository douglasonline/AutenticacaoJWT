# Use a imagem oficial do Node.js 14 LTS como imagem base
FROM node:14

# Defina o diretório de trabalho na imagem Docker
WORKDIR /usr/src/app

# Copie package.json e package-lock.json
COPY package*.json ./

# Instale todas as dependências do Node.js
RUN npm install

# Copie o restante do código-fonte do seu aplicativo na imagem do Docker
COPY . .

# Compilar TypeScript para JavaScript
RUN npm run build

# Exponha a porta em que seu aplicativo será executado
EXPOSE 3000

# Comando para executar seu aplicativo usando o código JavaScript compilado
CMD ["node", "dist/index.js"]