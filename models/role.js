'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static get ADMIN() {
      return 'ADMIN'
    }
    static get STANDARD() {
      return 'STANDARD'
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User, { as: 'users' })
    }
  }
  Role.init(
    {
      label: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false, //no createAt and updatedAt fields
      sequelize,
      modelName: 'Role',
      tableName: 'ref_role',
    }
  )
  return Role
}
