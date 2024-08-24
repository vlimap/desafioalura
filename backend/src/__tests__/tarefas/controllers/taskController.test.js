const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../../index');
const Task = require('../../../tarefas/models/taskModel');

describe('Task Controller', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados de teste
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    // Limpar a coleção e desconectar do banco de dados
    await Task.deleteMany({});
    await mongoose.disconnect();
  });

  let taskId;

  it('deve criar uma nova tarefa', async () => {
    const response = await request(app)
      .post('/api/tarefas')
      .send({
        titulo: 'Tarefa Teste',
        descricao: 'Descrição da tarefa teste',
        prioridade: 'Alta',
        data: new Date(),
        responsaveis: ['Responsável 1']
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    taskId = response.body._id; // Salva o ID para outros testes
  });

  it('deve obter todas as tarefas', async () => {
    const response = await request(app).get('/api/tarefas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('deve obter uma tarefa pelo ID', async () => {
    const response = await request(app).get(`/api/tarefas/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', taskId);
  });

  it('deve atualizar uma tarefa pelo ID', async () => {
    const response = await request(app)
      .put(`/api/tarefas/${taskId}`)
      .send({
        titulo: 'Tarefa Teste Atualizada',
        descricao: 'Descrição atualizada',
        prioridade: 'Média',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('titulo', 'Tarefa Teste Atualizada');
  });

  it('deve deletar uma tarefa pelo ID', async () => {
    const response = await request(app).delete(`/api/tarefas/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tarefa deletada com sucesso');
  });
});
