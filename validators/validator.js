const { body, param, validationResult } = require('express-validator')

// common rules
const getIdRules = () => {
  return [param('id').isInt().withMessage("L'identifiant doit être un entier")] //todo mettre ca a tous
}

// User rules
const addUserValidationRules = () => {
  return [
    body('email').isEmail().withMessage("L'email doit être un email valide"),
    body('password')
      .isLength({ min: 5 })
      .withMessage(
        'La longueur du mot de passe doit être au moins 5 caractères'
      ),
  ]
}

const modifyUserValidationRules = () => {
  return [
    param('id').isInt().withMessage("L'identifiant doit être un entier"),
    [...addUserValidationRules()],
  ]
}

const loginUserValidationRules = () => {
  return addUserValidationRules()
}

// Article rules
const addArticleValidationRules = () => {
  return [
    body('title')
      .isLength({ min: 2 })
      .withMessage('La longueur du titre doit être au moins 2 caractères'),
    body('text')
      .isLength({ min: 10 })
      .withMessage('La longueur du texte doit être au moins 10 caractères'),
    body('userId')
      .isInt()
      .withMessage("L'identifiant de l'utilisateur doit être un entier"),
  ]
}

const modifyArticleValidationRules = () => {
  return [
    param('id').isInt().withMessage("L'identifiant doit être un entier"),
    [...addArticleValidationRules()],
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  getIdRules,
  addUserValidationRules,
  modifyUserValidationRules,
  loginUserValidationRules,
  addArticleValidationRules,
  modifyArticleValidationRules,
  validate,
}
