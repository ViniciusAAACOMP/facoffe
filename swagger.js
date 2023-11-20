const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/controller/plans.controller.js']

swaggerAutogen(outputFile, endpointsFiles)