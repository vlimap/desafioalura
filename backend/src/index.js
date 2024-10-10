const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/config'); 
const taskRoutes = require('./tarefas/routes/routes'); 
const cors = require('cors');

dotenv.config();

const app = express();

// Configurações do CORS
const corsOptions = {
  origin: process.env.URI, 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Se você estiver enviando cookies ou autenticação
  allowedHeaders: [
    'X-CSRF-Token', 
    'X-Requested-With', 
    'Accept', 
    'Accept-Version', 
    'Content-Length', 
    'Content-MD5', 
    'Content-Type', 
    'Date', 
    'X-Api-Version'
  ],
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use('/api/tarefas', taskRoutes);

// Verifique o ambiente e inicie o servidor apenas se não for o ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
}

module.exports = app;
