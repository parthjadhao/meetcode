const jwt = require('jsonwebtoken')
let adminSecret = "lksdfjksdlfjsdkl"
const {Admin} = require('../db/index.js')

async function adminAuthentication(req, res, next) {
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, adminSecret, async (err, adminDetail) => {
      if (err) {
        res.status(404).send("unexpected error while decoding the token inside adminAuthetication")
      }
      adminExist = await Admin.findOne({ username: adminDetail.username, password: adminDetail.password })
      if (!adminExist) {
        res.status(400).send('admin with such username dont exists')
      }
      req.admin = adminDetail
      next()
    })
}

module.exports = {
    adminAuthentication,
    adminSecret
}