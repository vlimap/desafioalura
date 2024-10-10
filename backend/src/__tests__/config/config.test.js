const mongoose = require('mongoose');
require('dotenv').config();

describe('Database Connection', () => {
  beforeAll(async () => {
    // Conectar ao banco de dados antes de todos os testes
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    // Desconectar do banco de dados após todos os testes
    await mongoose.connection.close();
  });

  it('deve conectar ao banco de dados com sucesso', async () => {
    expect(mongoose.connection.readyState).toBe(1); // 1 indica conexão aberta
  });

  it('deve falhar ao conectar com uma URI inválida', async () => {
    try {
      await mongoose.connect('mongodb://invaliduri');
    } catch (error) {
      expect(error).toBeDefined(); // Espera que um erro seja lançado
    }
  });
});
