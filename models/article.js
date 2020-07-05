'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.userId = this.belongsTo(models.User, {
      //   foreignKey: {
      //     name: 'user_id',
      //   },
      //   allowNull: false,
      // })
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: DataTypes.STRING,
      text: DataTypes.STRING,
      tags: DataTypes.STRING,
      isPublic: DataTypes.BOOLEAN,
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Article',
      tableName: 'article',
    }
  )
  return Article
}
