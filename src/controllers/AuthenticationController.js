const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')()

function jwtSignUser(user) {
  const ONE_WEEK = '7d'
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

async function register(req, res) {
  try {
    const user = await User.create(req.body)

    const userJSON = user.toJSON()
    res.status(200).send({
      user: userJSON,
      token: jwtSignUser(userJSON)
    })

  } catch (error) {
    res.status(400).send({
      error: 'This email account is already in use'
    })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: {
        email: email
      }      
    })
    if(!user){
      return res.status(403).send({
        error: 'The login information is incorrect'
      })
    }
    const isPasswordValid = await user.comparePassword(password)

    if(!isPasswordValid) {
      return res.status(403).send({
        error: 'The login password is incorrect'
      })
    }

    const userJSON = user.toJSON()
    res.status(200).send({
      user: userJSON,
      token: jwtSignUser(userJSON)
    })
  } catch (err) {
    res.status(500).send({
      error: 'An error has occured trying to log in',
      message: err
    })
  }
}

module.exports ={
  register,
  login
}