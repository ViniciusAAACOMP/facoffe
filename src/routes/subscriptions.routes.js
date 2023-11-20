const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscription.controllers');

// Rota para listar todas as assinaturas
router.get('/', subscriptionController.getAllSubscriptions);

// Rota para obter detalhes de uma assinatura específica
router.get('/:id', subscriptionController.getSubscriptionById);

// Rota para criar uma nova assinatura
router.post('/', subscriptionController.createSubscription);

// Rota para excluir uma assinatura
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
