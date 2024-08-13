const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/config'); 
const taskRoutes = require('./tarefas/routes/routes'); 
const cors = require('cors');


// variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

// parsear o corpo das requisições como JSON
app.use(express.json());

// rotas
app.use('/api/tarefas', taskRoutes); 

// iniciando servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

