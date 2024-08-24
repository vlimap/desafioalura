const request = require('supertest');
const app = require('../../../index');
const mongoose = require('mongoose');
const Task = require('../../../tarefas/models/taskModel');

describe('Task Routes', () => {
  let taskId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await Task.deleteMany({});
    await mongoose.disconnect();
  });

  it('GET /api/tarefas deve retornar status 200', async () => {
    const response = await request(app).get('/api/tarefas');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it('POST /api/tarefas deve criar uma nova tarefa', async () => {
    const response = await request(app)
      .post('/api/tarefas')
      .send({
        titulo: 'Nova Tarefa',
        descricao: 'Descrição da nova tarefa',
        prioridade: 'Média',
        data: new Date(),
        responsaveis: ['Responsável 1']
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');

    // Armazena o ID para outros testes
    taskId = response.body._id;
  });

  it('PUT /api/tarefas/:id deve atualizar uma tarefa existente', async () => {
    const response = await request(app)
      .put(`/api/tarefas/${taskId}`)
      .send({ titulo: 'Tarefa Atualizada' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('titulo', 'Tarefa Atualizada');
  });

  it('DELETE /api/tarefas/:id deve deletar uma tarefa existente', async () => {
    // Certifique-se de que a tarefa ainda existe antes de deletá-la
    const task = await Task.findById(taskId);
    expect(task).not.toBeNull();

    const response = await request(app).delete(`/api/tarefas/${taskId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Tarefa deletada com sucesso');

    // Verifique se a tarefa foi realmente deletada
    const deletedTask = await Task.findById(taskId);
    expect(deletedTask).toBeNull();
  });
});
