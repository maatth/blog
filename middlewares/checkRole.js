const RoleModel = require('../models').Role

module.exports = (requiredRole) => {
  return async (req, res, next) => {
    console.log('Required role?')

    const currentUserRole = await RoleModel.findOne({
      where: { id: req.currentUser.role_id },
      attributes: ['code'],
    })

    if (currentUserRole.code !== requiredRole) {
      return res.status(401).end()
    } else {
      console.log('User meet required role, going to next middleware')
      return next()
    }
  }
}
