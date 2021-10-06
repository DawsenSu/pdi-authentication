const IsAuthenticated = require('../policies/IsAuthenticated')
const IsAuthRole = require('../policies/IsAuthRole')
const UserController = require('../controllers/UserController')

module.exports = (routers) => {
  routers.get('/user/:userId',
    IsAuthenticated,
    IsAuthRole('Admin'),
    UserController.index)

  routers.get('/users',
    IsAuthenticated,
    IsAuthRole('Admin'),
    UserController.show)

  routers.post('/user/role',
    IsAuthenticated, 
    IsAuthRole('Admin'),
    UserController.role)
  
}