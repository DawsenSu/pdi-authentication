const express = require('express')
const router = express.Router()
const config = require('../config/config')()

const AuthenticationRoutes = require('./AuthenticationRoutes')
const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')
const VerifyRoutes = require('./VerifyRoutes')


module.exports = (app) => {
  //redirect to api-docs page for test and read
  router.get('/', function (req, res) {
    if (!process.env.ENV) {
      res.redirect("/api-docs/")
    } else {
      res.redirect(`${config.baseUrl}/api-docs/`)
    }
  })

  AuthenticationRoutes(router)
  UserRoutes(router)
  ProductRoutes(router)
  VerifyRoutes(router)

  app.use(router)
}