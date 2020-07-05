const UserModel = require('../models').User

module.exports = async (req, res, next) => {
  try {
    const decodedUser = req.token.data
    const user = await UserModel.findByPk(decodedUser.id)
    if (!user) {
      res.status(401).end()
    }
    req.currentUser = user
    return next()
  } catch (e) {
    return res.json(e).status(500)
  }
}
