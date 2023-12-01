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

# Utilize uma variável de ambiente para definir a porta.
# O valor default será 3000, mas isso pode ser alterado
# ao rodar o contêiner com a flag -e, por exemplo: docker run -e PORT=4000
ENV PORT=3000
EXPOSE $PORT

# Comando para executar seu aplicativo usando o código JavaScript compilado
# O comando agora utiliza a variável de ambiente para definir a porta
CMD ["node", "dist/index.js"]