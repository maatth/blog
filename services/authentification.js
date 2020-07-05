const UserService = require('./user')
const UserModel = require('../models').User
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class Authentification {
  async login(email, password) {
    const user = await UserModel.scope('withPassword').findOne({
      where: { email: email },
    })

    if (!user) {
      const error = new Error("L'email ne correspond à aucun utilisateur")
      error.status = 400
      throw error
    }

    const correctPassword = await argon2.verify(user.password, password)

    if (!correctPassword) {
      const error = new Error('Mot de passe incorrect')
      error.status = 400
      throw error
    }

    return {
      user: {
        email: user.email,
        name: user.nickname,
      },
      token: this.generateJWT(user),
    }
  }

  generateJWT(user) {
    return jwt.sign(
      {
        data: {
          id: user.id,
          nickname: user.nickname,
          email: user.email,
        },
      },
      'Maclesupertops3cret',
      { expiresIn: '2h' }
    ) // @TODO move this to an env var
  }
}

module.exports = Authentification
