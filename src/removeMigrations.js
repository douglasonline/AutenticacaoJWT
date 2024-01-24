"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var migrationsDir = './src/migrations';
// Remove todos os arquivos no diretório de migrações
var removeMigrationFiles = function () {
    if (fs.existsSync(migrationsDir)) {
        fs.readdirSync(migrationsDir).forEach(function (file) {
            var filePath = path.join(migrationsDir, file);
            // Remove cada arquivo no diretório
            fs.unlinkSync(filePath);
        });
        console.log('Arquivos de migração removidos com sucesso!');
    }
    else {
        console.log('O diretório de migrações não existe.');
    }
};
// Chama a função para remover arquivos de migração
removeMigrationFiles();
