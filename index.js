const subscriptionRoutes = require('./routes/subscriptionRoutes');
const userRoutes = require('./routes/userRoutes');
const planRoutes = require('./routes/planRoutes');
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

//Rotas
app.use('/sub', subscriptionRoutes);
app.use('/user', userRoutes);
app.use('/plans', planRoutes);

//inicia o servidor
app.listen(port);
console.log('API funcionando!');