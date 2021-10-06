const { User, Product } = require('../models')

async function show(req, res) {
  const { userId } = req.params
  try {
    const user = await User.findByPk(userId)
    const products = await user.getProducts()
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send({
      error: `Can not get product for user ${userId}`
    })
  }
}

async function index(req, res) {
  const { userId, productId } = req.params
  try {
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)
    const hasProduct = await user.hasProduct(product)
    res.status(200).send(hasProduct)
  } catch (error) {
    res.status(400).send({
      error: `Can not get product ${productId} for user ${userId}`
    })
  }
}

async function post(req, res) {
  const { userId, productId } = req.params
  try {
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)
    await user.addProduct(product)
    res.status(200).send(true)
  } catch (error) {
    res.status(400).send({
      error: `Can not assign product ${productId} for user ${userId}`
    })
  }
}

async function remove(req, res) {
  const { userId, productId } = req.params
  try {
    const user = await User.findByPk(userId)
    const product = await Product.findByPk(productId)
    await user.removeProduct(product)
    res.status(200).send(true)
  } catch (error) {
    res.status(400).send({
      error: `Can not remove product ${productId} for user ${userId}`
    })
  }
}

module.exports = {
  show,
  index,
  post,
  remove
}