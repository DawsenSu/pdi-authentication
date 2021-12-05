const AuthenticationController = require('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('../policies/AuthenticationControllerPolicy')

module.exports = (routers) => {
  routers.post('/register', AuthenticationControllerPolicy.register, AuthenticationController.register)

  routers.post('/login', AuthenticationController.login)

  routers.get('/getKeys/css', AuthenticationController.cssKeys)
}