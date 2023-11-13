const express = require('express');
const router = express.Router();
const mockUser = require('./mockUser');

let is_subscribed = false;
let currentPlan = '';

const Unsubscribe = (user) => {
  if (!user) {
    return { success: false, message: 'Usuário não encontrado.' };
  }
  is_subscribed = false;
  currentPlan = '';
  return { success: true, message: `Assinatura cancelada para o usuário ${user.nome}.` };
};

router.delete('/', (req, res) => {
  const result = Unsubscribe(mockUser);
  res.json(result);
});

module.exports = router;
