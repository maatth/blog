const Router = require('express').Router
const ArticleService = require('../../../../../services/article')
const { getIdRules, validate } = require('../../../../../validators/validator')

module.exports = Router({ mergeParams: true }).delete(
  '/v1/users/:id',
  getIdRules(),
  validate,
  async (req, res, next) => {
    try {
      const articleService = new ArticleService()
      await articleService.deleteById(req.params.id)
      res.status(205)
      res.json({ message: 'Deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
)
