const {
  sequelize,
  User,
  Product,
  UserProduct
} = require('../src/models')

const config = require('../src/config/config')()
const Promise = require('bluebird')
const tunnel = require('tunnel-ssh')

const users = require('./users.json')
const products = require('./products.json')
const userProducts = require('./userProducts.json')


tunnel(config.ssh, (error, server) =>{
  if(error) {
    console.error(error)
  } else {
    console.info('Server Info:', server)
    sequelize.sync({force: true})
    .then( async function () {
        await Promise.all(users.map( user => User.create(user)))

        await Promise.all(products.map( product => Product.create(product)))

        await Promise.all(userProducts.map( userProduct => UserProduct.create(userProduct)))

        console.info('reset all data with seed')
    })
    .catch((err) =>{
      console.error('Unable to established connection',err)
    })
  }
})  