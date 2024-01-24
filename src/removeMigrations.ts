import * as fs from 'fs';
import * as path from 'path';

const migrationsDir = './src/migrations';

// Remove todos os arquivos no diretório de migrações
const removeMigrationFiles = () => {
  if (fs.existsSync(migrationsDir)) {
    fs.readdirSync(migrationsDir).forEach((file) => {
      const filePath = path.join(migrationsDir, file);
      // Remove cada arquivo no diretório
      fs.unlinkSync(filePath);
    });

    console.log('Arquivos de migração removidos com sucesso!');
  } else {
    console.log('O diretório de migrações não existe.');
  }
};

// Chama a função para remover arquivos de migração
removeMigrationFiles();
