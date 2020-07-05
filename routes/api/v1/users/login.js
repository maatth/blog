const Router = require('express').Router
const AuthentificationService = require('../../../../services/authentification')
const {
  loginUserValidationRules,
  validate,
} = require('../../../../validators/validator')

module.exports = Router({ mergeParams: true }).post(
  '/v1/users/login',
  loginUserValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const email = req.body.email
      const password = req.body.password
      const authentificationService = new AuthentificationService()
      const { user, token } = await authentificationService.login(
        email,
        password
      )
      res.status(200).json({ user, token })
    } catch (error) {
      next(error)
    }
  }
)
