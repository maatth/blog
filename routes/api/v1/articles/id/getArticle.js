const Router = require('express').Router
const ArticleService = require('../../../../../services/article')
const { getIdRules, validate } = require('../../../../../validators/validator')

module.exports = Router({ mergeParams: true }).get(
  '/v1/articles/:id',
  getIdRules(),
  validate,
  async (req, res, next) => {
    try {
      const articleService = new ArticleService()
      const article = await articleService.getById(req.params.id)
      res.status(200)
      res.json(article)
    } catch (error) {
      next(error)
    }
  }
)
