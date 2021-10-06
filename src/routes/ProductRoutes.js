const IsAuthenticated = require('../policies/IsAuthenticated')
const IsAuthRole = require('../policies/IsAuthRole')
const ProductController = require('../controllers/ProductController')

module.exports = (routers) => {
  routers.get('/products',
    IsAuthenticated,
    ProductController.show)

  routers.get('/product/:productId',
    IsAuthenticated,
    ProductController.index)

  routers.post('/product',
    IsAuthenticated,
    IsAuthRole('Admin'),
    ProductController.post)

  routers.put('/product/:productId',
    IsAuthenticated,
    IsAuthRole('Admin'),
    ProductController.put)
}