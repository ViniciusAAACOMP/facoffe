const express = require('express');
const router = express.Router();
const mockUser = require('./mockUser');

let is_subscribed = false;
let currentPlan = '';

const Subscribe = (user, newPlan) => {
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }
  is_subscribed = true;
  currentPlan = newPlan;
  return { success: true, message: `Assinatura realizada com sucesso para o usuário ${user.nome} ao plano ${newPlan}.` };
};

router.post('/', (req, res) => {
  const { plan } = req.body;
  const result = Subscribe(mockUser, plan);
  res.json(result);
});

module.exports = router;
