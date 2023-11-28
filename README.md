# App

# Sobre o projeto

 O App é uma API RESTful com autenticação JWT de catálogo de filmes
 

## Layout web
![Web 1](https://github.com/douglasonline/Imagens/blob/master/app_layout_web1.png)

![Web 2](https://github.com/douglasonline/Imagens/blob/master/app_layout_web2.png)

# Tecnologias utilizadas
## Back end
- Node.js
- TypeScript
- TypeORM
- Redis
- PostgreSQL

## Front end
- EJS
- HTML 
- CSS
## Implantação em produção
- Back end: Heroku
- Banco de dados: Postgresql

# Como executar o projeto

## Back end
Pré-requisitos: Node.js, Redis, PostgreSQL

```bash
# Clonar repositório

# Criar o banco api_autenticacao_jwt no postgres

# Entrar na pasta do projeto back end

# Executar o comando npm install para instalar as dependências

# Executar o comando npm run migration:generate para criar as migration para gerar as tabelas

# Executar o comando npm rum migration:run para gerar as tabelas no Postgresql

# executar o projeto npm run dev para executar o projeto
```

## Como consumir o projeto

Estou utilizando o Postman para consumir a aplicação

- Primeiro cadastre um usuário

![Cadastro Usuario](https://github.com/douglasonline/Imagens/blob/master/Cadastro_usuario.png)

- Segundo faça o Login com isso você receberá um token de acesso

![Login](https://github.com/douglasonline/Imagens/blob/master/Login.png)

- Terceiro com o Login feito você pode cadastra uma categoria de filme   

![category](https://github.com/douglasonline/Imagens/blob/master/category.png)

- Não esquecendo que tem que passar o Token que você recebeu no cadastro      

![Token Category](https://github.com/douglasonline/Imagens/blob/master/token_category.png)

- Quarto para cadastra um filme você deve passar o Token que você recebeu ao fazer login e passar o id da categoria 

![Cadastrar Filmes](https://github.com/douglasonline/Imagens/blob/master/Cadastrar_Filmes.png)

- Quinto para atualizar um filme ou categoria se deve passar o id juntamente com o Token e os dados que deseja atualizar deve-se mudar a URL, category: categoria, filmes: films 

![Atualizar](https://github.com/douglasonline/Imagens/blob/master/Atualizar.png)

- Sexto para deleta se deve passar o id juntamente com o Token de qual deseja deleta

![Deletar](https://github.com/douglasonline/Imagens/blob/master/Deletar.png)

- Setimo para listar todos os dados deve-se passar na URL category: categoria, filmes: films juntamente com o Token

![Listar](https://github.com/douglasonline/Imagens/blob/master/Listar.png)


# Autor

Douglas

https://www.linkedin.com/in/douglas-j-b2194a232/

