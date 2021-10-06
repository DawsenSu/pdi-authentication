const IsAuthenticated = require('../policies/IsAuthenticated')
const IsAuthRole = require('../policies/IsAuthRole')
const VerifyController = require('../controllers/VerifyController')

module.exports = (routers) => {
  routers.get('/verify/:userId',
    IsAuthenticated,
    VerifyController.show)

  routers.get('/verify/:userId/:productId',
    IsAuthenticated,
    VerifyController.index)

  routers.post('/verify/:userId/:productId',
    IsAuthenticated, 
    IsAuthRole('Admin'),
    VerifyController.post)
  
  routers.delete('/verify/:userId/:productId',
    IsAuthenticated, 
    IsAuthRole('Admin'),
    VerifyController.remove)
}
