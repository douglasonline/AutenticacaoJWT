"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var migrationsDir = './src/migrations'; // Substitua pelo caminho correto do seu diretório de migrações
fs.readdir(migrationsDir, function (err, files) {
    if (err) {
        console.error('Erro ao ler o diretório de migrações:', err);
        return;
    }
    files.forEach(function (file) {
        if (file.endsWith('.ts')) { // Verifica se é um arquivo de migração TypeScript
            var filePath_1 = path.join(migrationsDir, file);
            fs.readFile(filePath_1, 'utf8', function (err, data) {
                if (err) {
                    console.error('Erro ao ler o arquivo de migração:', err);
                    return;
                }
                var regex = /`([^`;]*)`/g;
                var updatedData = data.replace(regex, function (match, capture) {
                    var trimmedCapture = capture.trim();
                    return trimmedCapture.endsWith(';') ? match : "`".concat(trimmedCapture, ";`");
                });
                fs.writeFile(filePath_1, updatedData, 'utf8', function (err) {
                    if (err) {
                        console.error('Erro ao escrever no arquivo de migração:', err);
                        return;
                    }
                    console.log("Ponto e v\u00EDrgula adicionado em ".concat(file));
                });
            });
        }
    });
});
