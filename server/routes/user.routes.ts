// const express = require('express')
import express from "express"
// const { Problem, User } = require('../db')
import Problem from "../db"
import User from "../db"
// const jwt = require('jsonwebtoken')
// import jwt from "jsonwebtoken"
// const {  userAuthentication } = require('../middlewares/userAuthentication')
import userSecret from "../middlewares/userAuthentication";
import userAuthentication from "../middlewares/userAuthentication"
// const { registerUser,userLogin,userShowAllProblems } = require('../controller/user.controller.js')
import registerUser from "../controller/user.controller"
import userLogin from "../controller/user.controller"
import userShowAllProblems from "../controller/user.controller"
const router = express.Router()

router.post('/registerUser', registerUser.registerUser)
// router.get("/userLogin", userAuthentication, userLogin);
router.get("/userLogin",userAuthentication.userAuthentication,userLogin.userLogin );
router.post('/userShowAllProblems', userAuthentication.userAuthentication, userShowAllProblems.userShowAllProblems)

// TODO : create user route which take user code and check wheather the solved question is correct or not
// router.post('/userSubmitProblemSolution', userAuthetication, (req, res) => {})

// module.exports = router
export default router