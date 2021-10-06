// eslint-disable-next-line no-unused-vars
module.exports = (sequelize, DataTypes) => {
  const UserProduct = sequelize.define('UserProduct',{})

  UserProduct.associate = function (models) {
    models.User.belongsToMany(models.Product, { through: UserProduct })
    models.Product.belongsToMany(models.User, { through: UserProduct })
  }

  return UserProduct
}