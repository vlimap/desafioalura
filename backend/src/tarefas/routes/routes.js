const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Importe o controlador das tarefas

// rotas e métodos correspondentes no controlador
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
