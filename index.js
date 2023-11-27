require('dotenv').config();
const express = require('express');
const userRoutes = require('./src/routes/users.routes.js');
const subsRoutes = require('./src/routes/subs.routes.js');
const plansRoutes = require('./src/routes/plans.routes.js');
const app = express();

app.use(express.json());
app.use('/sub', subsRoutes);
app.use('/usuarios', userRoutes);
app.use('/planos', plansRoutes);
app.get('/', (req, res) => res.json({ message: 'Servidor Facoffee' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
