const Task = require('../models/taskModel');

// obter todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', detalhes: error.message });
  }
};

// criar uma nova tarefa
exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar tarefa', detalhes: error.message });
  }
};

// obter uma tarefa pelo ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task){ 
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefa', detalhes: error.message });
  }
};

// atualizar uma tarefa pelo ID
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task){
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar tarefa', detalhes: error.message });
  }
};

// deletar uma tarefa pelo ID
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa deletada com sucesso' });

  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa', detalhes: error.message });
  }
};