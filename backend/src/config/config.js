const mongoose = require('mongoose');
require('dotenv').config();

const uri = 'mongodb://127.0.0.1:27017/tarefas';

if (!uri) {
  console.error("Erro: MONGODB_URI não está definida no arquivo .env.");
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch(err => {
    console.error('Erro ao conectar ao MongoDB', err);
  });
