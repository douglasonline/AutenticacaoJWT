"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const error_1 = require("./middlewares/error");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
// Função para tentar conectar ao banco de dados com retentativas
const tryConnectDatabase = async () => {
    //A declaração let connected = false; inicializa a variável connected com o valor false. 
    let connected = false;
    // Loop de tentativas de conexão
    //A expressão while (!connected) significa 
    //"enquanto não conectado". Ela cria um loop
    // que continuará executando o bloco de código
    // dentro dele enquanto a variável connected 
    //for falsa. Assim que connected se torna 
    //verdadeira, o loop é interrompido.
    while (!connected) {
        try {
            // Tenta inicializar a fonte de dados do aplicativo
            await data_source_1.AppDataSource.initialize();
            connected = true;
            // Se a inicialização for bem-sucedida, inicia o servidor Express
            await startApp();
        }
        catch (error) {
            // Se houver um erro, exibe o erro e tenta novamente após 20 segundos
            console.error('Erro durante a inicialização do Banco de Dados:', error);
            console.log('Tentando novamente em 20 segundos...');
            await new Promise(resolve => setTimeout(resolve, 20000)); // Aguarda 20 segundos
        }
    }
};
// 1. Chama a função para tentar conectar ao banco de dados e iniciar o servidor
tryConnectDatabase()
    .then(() => {
    console.log('Aplicativo iniciado com sucesso!');
})
    .catch((error) => {
    console.error('Erro durante a inicialização do Banco de Dados:', error);
});
// Função para iniciar o servidor Express
// Sem utilizar o async tem que colocar o return new Promise
const startApp = () => {
    return new Promise((resolve) => {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        // Configure o Express para usar EJS
        app.set("views", path_1.default.join(__dirname, "views"));
        app.set("view engine", "ejs");
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use(routes_1.default);
        app.use(error_1.errorMiddleware);
        // Criação do servidor Express
        const server = app.listen(process.env.PORT || 3000);
        // Evento disparado quando o servidor está ouvindo
        server.on('listening', () => {
            console.log(`Servidor ouvindo na porta ${process.env.PORT || 3000}`);
            resolve();
        });
        // Evento disparado em caso de erro no servidor
        server.on('error', (err) => {
            console.error('Erro durante a inicialização do servidor:', err);
        });
    });
};
//# sourceMappingURL=index.js.map