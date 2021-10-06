const { User } = require('../models')

async function index(req, res) {
  const { userId } = req.params
  console.log(userId)
  try {
    const user = await User.findOne({
      where:{
        id: userId
      }
    })
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send({
      error: `Can not get user by ${userId}`
    }) 
  }
}

async function show(req, res) {
  try {
    const users = await User.findAll({
      limit: 10
    })
    res.status(200).send(users)
  } catch (error) {
    return res.status(400).send({
      error: 'Can not get users'
    })
  }
}

async function role(req, res) {
  try {
    const { userId, role } = req.query

    const user = await User.findByPk(userId)
    if(!user) {
      return res.status(400).send({
        error: `Can not find user by userId${userId}`
      })
    }

    user.role = role
    await user.save()

    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({
      error: 'An error ocurred trying to set a role'
    })
  }
}

module.exports = {
  index,
  show,
  role
}