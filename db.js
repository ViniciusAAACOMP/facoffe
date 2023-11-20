const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

async function selectCustomers() {
    const res = await client.query('SELECT * FROM usuarios');
    return res[0];
}

module.exports = { selectCustomers }