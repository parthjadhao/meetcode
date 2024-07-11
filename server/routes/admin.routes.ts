// const express = require('express')
import express, { Application } from "express"
// const { Admin, Problem } = require('../db')
// import{Admin,Problem} from "../db"
// const { adminAuthentication } = require('../middlewares/adminAuthentication')
import adminAuthentication from "../middlewares/adminAuthentication"
import adminLogin from "../controller/admin.controller"
import adminUplodProblem from "../controller/admin.controller";
import registerAdmin from "../controller/admin.controller";
// const { adminLogin, adminUplodProblem, registerAdmin } = require('../controller/admin.controller.js')

const router = express.Router()

router.get('/adminLogin', adminAuthentication.adminAuthentication, adminLogin.adminLogin)
router.post('/registerAdmin', registerAdmin.registerAdmin);
router.post('/adminUplodProblem', adminAuthentication.adminAuthentication, adminUplodProblem.adminUplodProblem);

// module.exports = router
export default router