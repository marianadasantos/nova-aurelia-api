const swaggerAutogen = require('swagger-autogen')()
const ouputFile = './swagger/swagger_output.json'
const edpointsFiles = ['./src/app.js']
swaggerAutogen(ouputFile, edpointsFiles)