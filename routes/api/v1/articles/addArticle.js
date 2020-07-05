const Router = require('express').Router
const ArticleService = require('../../../../services/article')
const {
  addArticleValidationRules,
  validate,
} = require('../../../../validators/validator')

module.exports = Router({ mergeParams: true }).post(
  '/v1/articles',
  addArticleValidationRules(),
  validate,
  async (req, res, next) => {
    try {
      const articleService = new ArticleService()
      const newArticleData = req.body
      const addedArticle = await articleService.add(newArticleData)
      res.status(201)
      res.json(addedArticle)
    } catch (error) {
      next(error)
    }
  }
)
