const Router = require('express').Router
const UserService = require('../../../../services/user')
const {
  addUserValidationRules,
  validate,
} = require('../../../../validators/validator')

module.exports = Router({ mergeParams: true }).post(
  '/v1/users',
  addUserValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const userService = new UserService()
      const newUserData = req.body
      const addedUser = await userService.add(newUserData)
      res.status(201)
      res.json(addedUser)
    } catch (error) {
      next(error)
    }
  }
)
