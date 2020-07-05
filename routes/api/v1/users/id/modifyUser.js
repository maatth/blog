const Router = require('express').Router
const UserService = require('../../../../../services/user')
const {
  modifyUserValidationRules,
  validate,
} = require('../../../../../validators/validator')

module.exports = Router({ mergeParams: true }).put(
  '/v1/users/:id',
  modifyUserValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const userService = new UserService()
      const modifiedUser = await userService.modify(req.params.id, req.body)
      res.status(200)
      res.json(modifiedUser)
    } catch (error) {
      next(error)
    }
  }
)
