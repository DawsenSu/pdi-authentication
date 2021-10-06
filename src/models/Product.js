const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    majorVersion:{ 
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    minorVersion: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    productID: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    }
  })
  
  return Product
}