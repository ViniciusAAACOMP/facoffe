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

async function selectCustomer(nome) {
  const client = await connect();
  try {
    const res = await client.query('SELECT * FROM usuarios WHERE nome=$1', [nome]);
    return res.rows;
  } finally {
    client.release();
  }
}

async function selectCustomers() {
  const client = await connect();
  try {
    const res = await client.query('SELECT * FROM usuarios');
    return res.rows;
  } finally {
    client.release();
  }
}

async function insertCustomer(customer) {
  const client = await connect();
  try {
    const sql = 'INSERT INTO usuarios(nome,email,conta) VALUES ($1,$2,$3);';
    const values = [customer.nome, customer.email, customer.conta];
    return await client.query(sql, values);
  } finally {
    client.release();
  }
}

module.exports = { selectCustomers, selectCustomer, insertCustomer };
