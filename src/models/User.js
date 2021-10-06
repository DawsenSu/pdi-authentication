const bcrypt = require('bcryptjs')

// eslint-disable-next-line no-unused-vars
async function hashPassword(user) {
  const SALT_ROUND = 10
  if(!user.changed('password')){
    return
  }
  const hash = await bcrypt.hash(user.password, SALT_ROUND)
  user.setDataValue('password', hash)
}

module.exports =  (sequelize, DataTypes)  =>{
  const User = sequelize.define('User', {
      email : {
          type: DataTypes.STRING,
          unique: true
        },
      password:DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('Admin','Basic'),
        defaultValue: 'Basic'
      }
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword
      }
    }
  )

  User.prototype.comparePassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password)
  }

  return User
}