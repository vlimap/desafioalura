const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./tarefas/routes/routes'); 

dotenv.config();
const app = express();

// Configurações do CORS para permitir acesso do seu frontend
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: false, // Se estiver usando cookies ou autenticação
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas
app.use('/api/tarefas', taskRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
