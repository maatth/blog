'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Role, { foreignKey: 'role_id', as: 'role' })
    }
  }
  User.init(
    {
      nickname: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: DataTypes.STRING,
      salt: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roleId: {
        type: DataTypes.INTEGER,
        field: 'role_id',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'ref_role',
          key: 'id',
        },
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password', 'salt'] }, //take away the password and the salt
      },
      scopes: {
        withPassword: {
          attributes: { include: ['password'] },
        },
      },
      sequelize,
      modelName: 'User',
      tableName: 'user',
    }
  )
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get())
    delete values.password //pas rammener le password
    delete values.salt //pas rammener le salt

    return values
  }
  return User
}
