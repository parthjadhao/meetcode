const express = require('express')
const { Admin, Problem } = require('../db')
const { adminAuthentication } = require('../middlewares/adminAuthentication')
const { adminLogin, adminUplodProblem, registerAdmin } = require('../controller/admin.controller.js')

const router = express.Router()

router.get('/adminLogin', adminAuthentication, adminLogin)
router.post('/registerAdmin', registerAdmin);
router.post('/adminUplodProblem', adminAuthentication, adminUplodProblem);

module.exports = router