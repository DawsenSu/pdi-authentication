const { User } = require('../models')
const validator = require('validator')

module.exports = {
  async register (req, res, next) {
    try {
      const { email, password } = req.body
      if(!validator.isEmail(email)) {
        return res.status(400).send({
          error: 'You must provide a valid email addresss'
        })
      }
      if(!validator.isStrongPassword(password)) {
        return res.status(400).send({
          error: 'Your password is not a strong type'
        })
      }
      const user = await User.findOne({
        where: {
          email: email
        }      
      })
      if(user) {
        return res.status(400).send({
          error: 'This account has already been registered'
        })
      }
      next()
    } catch (error) {
      res.status(500).send({
        error: 'Unkown internal server error'
      })
    }
  }
}