const express = require('express');
const router = express.Router();
const planService = require('../services/plans.services');

router.get('/', async (req, res) => {
  res.json({ message: 'Servidor Facoffee - Rota de Planos' });
});

router.get('/:id', async (req, res) => {
  const plan = await planService.selectPlan(req.params.id);
  res.json(plan);
});

router.get('/:id', async (req, res) => {
  const plans = await planService.selectPlans();
  res.json(plans);
});

router.post('/', async (req, res) => {
  try {
    await planService.insertPlan(req.body);
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inserir Plano' });
  }
});

module.exports = router;
