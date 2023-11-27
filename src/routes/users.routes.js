const express = require('express');
const router = express.Router();
const userService = require('../services/users.services');

router.get('/', async (req, res) => {
  res.json({ message: 'Servidor Facoffee - Rota de Usuários' });
});

router.get('/:id', async (req, res) => {
  const user = await userService.selectCustomer(req.params.id);
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const users = await userService.selectCustomers();
  res.json(users);
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    await userService.insertCustomer(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir usuário' });
  }
});

module.exports = router;
