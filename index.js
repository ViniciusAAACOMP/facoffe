require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT;
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.get('/usuarios', async (req, res) => {
    const results = await db.selectCustomers();
    res.json(results);
})
//inicia o servidor
app.listen(port);
console.log('API funcionando!');