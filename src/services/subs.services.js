const { Pool } = require('pg');

async function connect() {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    const client = await pool.connect();
    console.log('Criou pool de conexões no PostgreSQL!');

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);

    client.release();
    global.connection = pool;
    return pool.connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

async function selectSubscription(id) {
  const sub = await connect();
  try {
    const res = await sub.query(
      'SELECT * FROM assinaturas WHERE id=$1 AND is_active = $2',
      [id, true]
    );
    return res.rows;
  } finally {
    sub.release();
  }
}


async function selectSubscriptions(id_usuario) {
  const sub = await connect();
  try {
    const res = await sub.query(
      'SELECT * FROM assinaturas WHERE id_usuario = $1',
      [id_usuario]
    );
    return res.rows;
  } finally {
    sub.release();
  }
}


async function insertSubscription(subscription) {
  await validateSubscription(subscription);

  const sub = await connect();
  try {
    const sql =
      'INSERT INTO assinaturas(id_usuario, id_plano, periodo_faturamento, data_inicio, data_termino, is_active) VALUES ($1, $2, $3, $4, $5, $6);';
    const values = [
      subscription.usuario,
      subscription.plano,
      subscription.periodo_faturamento,
      subscription.data_inicio,
      subscription.data_termino,
      subscription.is_active,
    ];
    return await sub.query(sql, values);
  } finally {
    sub.release();
  }
}

async function validateSubscription(subscription) {
  const sub = await connect();
  try {
    const existingSubscription = await sub.query(
      'SELECT * FROM assinaturas WHERE id_usuario = $1 AND is_active = $2',
      [subscription.usuario, true]
    );

    if (existingSubscription.rows.length > 0) {
      await sub.query(
        'UPDATE assinaturas SET is_active = $1 WHERE id = $2',
        [false, existingSubscription.rows[0].id]
      );
    }
  } finally {
    sub.release();
  }
}

module.exports = { selectSubscriptions, selectSubscription, insertSubscription, validateSubscription };
