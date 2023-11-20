const pool = require('../db');

// Obter todas as assinaturas
const getAllSubscriptions = async () => {
  const result = await pool.query('SELECT * FROM assinaturas');
  return result.rows;
};

// Obter uma assinatura por ID
const getSubscriptionById = async (id) => {
  const result = await pool.query('SELECT * FROM assinaturas WHERE id_assinatura = $1', [id]);
  return result.rows[0];
};

// Criar uma nova assinatura
const createSubscription = async (subscription) => {
  const { id_usuario, id_plano, periodo_faturamento, data_inicio_assinatura, data_termino_assinatura, status_assinatura } = subscription;
  const result = await pool.query(
    'INSERT INTO assinaturas (id_usuario, id_plano, periodo_faturamento, data_inicio_assinatura, data_termino_assinatura, status_assinatura) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [id_usuario, id_plano, periodo_faturamento, data_inicio_assinatura, data_termino_assinatura, status_assinatura]
  );
  return result.rows[0];
};

// Atualizar uma assinatura existente
const updateSubscription = async (id, subscription) => {
  const { id_usuario, id_plano, periodo_faturamento, data_inicio_assinatura, data_termino_assinatura, status_assinatura } = subscription;
  const result = await pool.query(
    'UPDATE assinaturas SET id_usuario = $1, id_plano = $2, periodo_faturamento = $3, data_inicio_assinatura = $4, data_termino_assinatura = $5, status_assinatura = $6 WHERE id_assinatura = $7 RETURNING *',
    [id_usuario, id_plano, periodo_faturamento, data_inicio_assinatura, data_termino_assinatura, status_assinatura, id]
  );
  return result.rows[0];
};

// Excluir uma assinatura
const deleteSubscription = async (id) => {
  await pool.query('DELETE FROM assinaturas WHERE id_assinatura = $1', [id]);
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription
};
