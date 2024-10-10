const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/config'); 
const taskRoutes = require('./tarefas/routes/routes'); 
const cors = require('cors');

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração do aplicativo Express
const app = express();

// Configurações do CORS
const corsOptions = {
  origin: '*', // Substitua pelo seu domínio frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Habilitar se você estiver enviando cookies ou autenticação
};

app.use(cors(corsOptions)); // Aplicar as configurações de CORS
app.use(express.json()); // Parsear o corpo das requisições como JSON

// Rotas
app.use('/api/tarefas', taskRoutes);

// Servir arquivos estáticos (somente se necessário para produção)
app.use(express.static('build'));

// Verifique o ambiente e inicie o servidor apenas se não for o ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
