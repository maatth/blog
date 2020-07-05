const { Op } = require('sequelize')
const ArticleModel = require('../models').Article
const UserService = require('./user')

class Article {
  async getById(id) {
    const article = await ArticleModel.findByPk(id)
    if (!article) {
      const error = new Error('Aucun article trouvé pour cet id')
      error.status = 400
      throw error
    }

    return article
  }

  async getAll() {
    const articles = await ArticleModel.findAll()

    return articles
  }

  async deleteById(id) {
    await this.getById(id) // check if article really exists
    const isSuccess = await ArticleModel.destroy({ where: { id: id } })
    if (!isSuccess) {
      const error = new Error(
        "Une erreur est survenue lors de la suppression de l'article d'id : " +
          id
      )
      error.status = 503
      throw error
    }

    return id
  }

  async add(newArticle) {
    const userService = new UserService()
    await userService.getById(newArticle.userId) //check if user exists

    const createdArticle = await ArticleModel.create({
      title: newArticle.title,
      image: newArticle.image,
      text: newArticle.text,
      tags: newArticle.tags,
      isPublic: !newArticle.isPublic ? false : true,
      userId: newArticle.userId,
    })
    const createdArticleJson = createdArticle.toJSON()

    return createdArticleJson
  }

  async modify(id, newData) {
    const userService = new UserService()
    await userService.getById(newData.userId) //check if user exists

    await ArticleService.getById(newData.id) //check if article exists

    article.title = newData.title
    article.image = newData.image
    article.text = newData.text
    article.tags = newData.tags
    article.isPublic = newData.isPublic
    article.userId = newData.userId // @TODO destructurer
    article.save()

    return article
  }
}

module.exports = Article
