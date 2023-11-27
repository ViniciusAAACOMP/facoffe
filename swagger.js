const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nome da sua API',
      version: '1.0.0',
      description: 'Descrição da sua API',
    },
  },
  apis: ['./src/routes/*.js', './src/middleware/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
