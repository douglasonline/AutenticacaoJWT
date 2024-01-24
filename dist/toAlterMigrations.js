"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const migrationsDir = './src/migrations'; // Substitua pelo caminho correto do seu diretório de migrações
fs.readdir(migrationsDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler o diretório de migrações:', err);
        return;
    }
    files.forEach(file => {
        if (file.endsWith('.ts')) { // Verifica se é um arquivo de migração TypeScript
            const filePath = path.join(migrationsDir, file);
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Erro ao ler o arquivo de migração:', err);
                    return;
                }
                const regex = /`([^`;]*)`/g;
                const updatedData = data.replace(regex, (match, capture) => {
                    const trimmedCapture = capture.trim();
                    return trimmedCapture.endsWith(';') ? match : `\`${trimmedCapture};\``;
                });
                fs.writeFile(filePath, updatedData, 'utf8', err => {
                    if (err) {
                        console.error('Erro ao escrever no arquivo de migração:', err);
                        return;
                    }
                    console.log(`Ponto e vírgula adicionado em ${file}`);
                });
            });
        }
    });
});
//# sourceMappingURL=toAlterMigrations.js.map