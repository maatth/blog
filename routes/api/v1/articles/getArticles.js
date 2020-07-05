const Router = require('express').Router
const isAuth = require('../../../../middlewares/isAuth')
const attachCurrentUser = require('../../../../middlewares/attachCurrentUser')
const checkRole = require('../../../../middlewares/checkRole')
const ArticleService = require('../../../../services/article')

module.exports = Router({ mergeParams: true }).get(
  '/v1/articles',
  isAuth,
  attachCurrentUser,
  checkRole('ADMIN'),
  async (req, res, next) => {
    try {
      const articleService = new ArticleService()
      const articles = await articleService.getAll()
      res.json(articles)
    } catch (error) {
      next(error)
    }
  }
)
