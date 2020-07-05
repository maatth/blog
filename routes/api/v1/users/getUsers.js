const Router = require('express').Router
const UserService = require('../../../../services/user')

module.exports = Router({ mergeParams: true }).get(
  '/v1/users',
  async (req, res, next) => {
    try {
      const userService = new UserService()
      const users = await userService.getAll()
      res.json(users)
    } catch (error) {
      next(error)
    }
  }
)
