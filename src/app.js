require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUi = require('swagger-ui-express')
const swaggerStats = require('swagger-stats')
const swaggerDocument = require('../swagger.json')
const config = require('./config/config')()
// eslint-disable-next-line no-unused-vars
const tunnel = require('tunnel-ssh')
const { sequelize } = require('./models')
const initializeRoutes = require('./routes')

const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(swaggerStats.getMiddleware({ swaggerSpec: swaggerDocument }))
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

//initalize and set routers
initializeRoutes(app)

//initialize passport-jwt
require('./passport')

if (!process.env.ENV) {
  // eslint-disable-next-line no-unused-vars
  tunnel(config.ssh, (error, server) => {
    if (error) {
      console.error(error)
    } else {
      // console.info('Server Info:', server)
      sequelize.sync()
        .then(() => {
          app.listen(config.port, () => {
            console.log(`App listening on port ${config.port}`)
          })
        })
        .catch((err) => {
          console.error('Unable to established connection', err)
        })
    }
  })
} else {
  sequelize.sync()
    .then(() => {
      app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`)
      })
    })
    .catch((err) => {
      console.error('Unable to established connection', err)
    })
}
