const Router = require('express').Router
const ArticleService = require('../../../../../services/article')
const {
  modifyArticleValidationRules,
  validate,
} = require('../../../../../validators/validator')

module.exports = Router({ mergeParams: true }).put(
  '/v1/articles/:id',
  modifyArticleValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const articleService = new ArticleService()
      const modifiedArticle = await articleService.modify(
        req.params.id,
        req.body
      )
      res.status(200)
      res.json(modifiedArticle)
    } catch (error) {
      next(error)
    }
  }
)
