const { Pool } = require('pg');

async function connect() {
  if (global.connection) return global.connection.connect();

  const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    const plan = await pool.connect();
    console.log('Criou pool de conexões no PostgreSQL!');

    const res = await plan.query('SELECT NOW()');
    console.log(res.rows[0]);

    plan.release();
    global.connection = pool;
    return pool.connect();
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

async function selectPlan(nome) {
  const plan = await connect();
  try {
    const res = await plan.query('SELECT * FROM planos WHERE nome=$1', [nome]);
    return res.rows;
  } finally {
    plan.release();
  }
}

async function selectPlans() {
  const plan = await connect();
  try {
    const res = await plan.query('SELECT * FROM planos');
    return res.rows;
  } finally {
    plan.release();
  }
}

async function insertPlan(plans) {
  const plan = await connect();
  try {
    const sql = 'INSERT INTO planos(nome,descricao,preco,status) VALUES ($1,$2,$3,$4);';
    const values = [plans.nome, plans.descricao, plans.preco, plans.status];
    return await plan.query(sql, values);
  } finally {
    plan.release();
  }
}

module.exports = { selectPlans, selectPlan, insertPlan };
