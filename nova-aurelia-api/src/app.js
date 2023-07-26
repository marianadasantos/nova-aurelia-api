require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/dbConnect')
const wordsRoutes = require('./routes/wordsRoutes')
const peopleRoutes = require('./routes/peopleRoutes')

const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect()

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger/swagger_output.json')
app.use('/my-documentation-route', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/words', wordsRoutes)
app.use('/people', peopleRoutes)

module.exports = app