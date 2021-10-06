const express = require('express')
const router = express.Router()

const AuthenticationRoutes = require('./AuthenticationRoutes')
const UserRoutes = require('./UserRoutes')
const ProductRoutes = require('./ProductRoutes')
const VerifyRoutes = require('./VerifyRoutes')

module.exports = (app) => {
  AuthenticationRoutes(router)
  UserRoutes(router)
  ProductRoutes(router)
  VerifyRoutes(router)

  app.use(router)
}