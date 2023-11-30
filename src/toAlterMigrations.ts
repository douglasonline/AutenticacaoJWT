import * as fs from 'fs';
import * as path from 'path';

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