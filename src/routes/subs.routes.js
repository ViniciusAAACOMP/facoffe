const express = require('express');
const router = express.Router();
const subscriptionService = require('../services/subs.services');
const userService = require('../services/users.services');
const planoService = require('../services/plans.services');
const Token = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const subscriptions = await subscriptionService.selectSubscriptions();
    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter assinaturas', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const subscription = await subscriptionService.selectSubscription(req.params.id);
    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter assinatura', details: error.message });
  }
});

router.post('/', async (req, res) => {
  usuario = await userService.selectCustomer(req.body.usuario);
  plano = await planoService.selectPlan(req.body.plano);
  try {
    email = usuario[0].email;
    senha = usuario[0].senha;
    const tokenInfo = await Token.obterToken(email, senha);
    const validateUser = await Token.validateUser(tokenInfo.token);
    const tokenInfoDecoded = await Token.decodeToken(tokenInfo.token);
    validatedUser = await userService.selectCustomer(validateUser.given_name);
    console.log(validatedUser[0].id)
    try {
      const subscriptionData = {
        usuario: validatedUser[0].id,
        plano: plano[0].id,
        periodo_faturamento: req.body.periodo,
        data_inicio: req.body.data_inicio,
        data_termino: req.body.data_termino,
        is_active: req.body.is_active,
      };
  
      await subscriptionService.insertSubscription(subscriptionData);
  
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar a assinatura', details: error.message });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Falha na autenticação', details: error.message });
  }
});

module.exports = router;
