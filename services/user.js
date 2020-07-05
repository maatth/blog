const { Op } = require('sequelize')
const UserModel = require('../models').User
const RoleModel = require('../models').Role
const argon2 = require('argon2')
const { randomBytes } = require('crypto')

class User {
  async getById(id) {
    const user = await UserModel.findOne({
      where: { id: id },
      include: 'role',
      // include: [
      //   {
      //     model: RoleModel,
      //     // attributes: ['label', 'code'],
      //   },
      // ],
    })
    if (!user) {
      const error = new Error('Aucun utilisateur trouvé pour cet id')
      error.status = 400
      throw error
    }

    return user
  }

  async getAll() {
    const users = await UserModel.findAll()

    return users
  }

  async deleteById(id) {
    await this.getById(id) // check if user really exists
    const isSuccess = await UserModel.destroy({ where: { id: id } })
    if (!isSuccess) {
      const error = new Error(
        "Une erreur est survenue lors de la suppression de l'utilisateur d'id : " +
          id
      )
      error.status = 503
      throw error
    }

    return id
  }

  async add(newUser) {
    const user = await UserModel.findOne({
      where: { email: newUser.email },
      attributes: ['id'],
    })
    if (user) {
      const error = new Error("L'email est déjà pris !")
      error.status = 400
      throw error
    }

    const salt = randomBytes(32)

    const passwordHashed = await argon2.hash(newUser.password, { salt })

    const standardRole = await RoleModel.findOne({
      where: { code: 'STANDARD' },
      attributes: ['id'],
    })

    const createdUser = await UserModel.create({
      nickname: newUser.nickname,
      email: newUser.email,
      password: passwordHashed,
      avatar: newUser.avatar,
      salt: salt.toString('hex'),
      roleId: standardRole.id,
    })

    return createdUser
  }

  async modify(id, newData) {
    const otherUser = await UserModel.findOne({
      where: {
        email: newData.email,
        id: { [Op.not]: id },
      },
      attributes: ['id'],
    })
    if (otherUser) {
      const error = new Error("L'email est déjà pris !")
      error.status = 400
      throw error
    }

    const user = await this.getById(id) // check if user really exists

    user.nickname = newData.nickname
    user.email = newData.email
    user.password = newData.password
    user.avatar = newData.avatar
    user.save()

    return user
  }
}

module.exports = User
