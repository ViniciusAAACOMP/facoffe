const express = require('express');
const bodyParser = require('body-parser');
const plansRouter = require('routes/plans.routes.js');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/src/routes', unsubscribeRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;