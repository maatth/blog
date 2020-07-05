const Router = require('express').Router
const UserService = require('../../../../../services/user')
const { getIdRules, validate } = require('../../../../../validators/validator')

module.exports = Router({ mergeParams: true }).get(
  '/v1/users/:id',
  getIdRules(),
  validate,
  async (req, res, next) => {
    try {
      const userService = new UserService()
      const user = await userService.getById(req.params.id)
      res.status(200)
      res.json(user)
    } catch (error) {
      next(error)
    }
  }
)
