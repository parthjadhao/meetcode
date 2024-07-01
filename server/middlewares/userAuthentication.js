const jwt = require('jsonwebtoken')
let userSecret = "klsdfjklsdfjsdklfj"
const {User} = require('../db/index.js')

async function userAuthentication(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, userSecret, async (err, userDetail) => {
        if (err) {
          res.status(404).send("unexpceted error while decoding the token inside userAutheticate")
        }
  
        userExist = await User.findOne({ username: userDetail.username, password: userDetail.password })
        if (!userExist) {
          return res.status(400).send('user with such username not exist')
        }
        req.user = userDetail
        next()
      })
    } catch (err) {
      console.log(err)
    }
  }

module.exports = {
    userAuthentication,
    userSecret
}