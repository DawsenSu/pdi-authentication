const { Product } = require('../models')

async function show(req, res) {
  try {
    const products = await Product.findAll({
      limit: 10
    })
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send({
      error: "Can not get products"
    })
  }
}

async function index(req, res) {
  const { productId } = req.params
  try {
    const product = await Product.findOne({
      where: {
        id: productId
      }
    })
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send({
      error: `Can not get product ${productId}`
    })
  }
}

async function post(req, res) {
  try {
    const product = await Product.create(req.body)
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send({
      error: `Can not create product`
    })
  }
}

async function put(req, res) {
  const { productId } = req.params
  try {
    await Product.update(req.body,{
      where: {
        id: productId
      }
    })
    const product = await Product.findOne({
        where:{
        id: productId
      }
    })
    res.status(200).send(product)
  } catch (error) {
    res.status(400).send({
      error: `Can not update product ${productId}`
    })
  }
}

module.exports = {
  show,
  index,
  post,
  put
}