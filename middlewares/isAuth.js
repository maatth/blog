const jwt = require('express-jwt')

const getTokenFromHeader = (req) => {
  console.log('req.headers.split')
  console.log(req.headers.authorization.split(' ')[1])
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  }
}

module.exports = jwt({
  secret: 'Maclesupertops3cret',
  algorithms: ['HS256'],
  userProperty: 'token', // this is where the next middleware can find the encoded data generated in services/auth:generateToken
  getToken: getTokenFromHeader,
})
