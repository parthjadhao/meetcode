const express = require('express')
const { Problem, User } = require('../db')
const jwt = require('jsonwebtoken')
const { userSecret, userAuthentication } = require('../middlewares/userAuthentication')
const { registerUser,userLogin,userShowAllProblems } = require('../controller/user.controller.js')

const router = express.Router()

router.post('/registerUser', registerUser)
router.get("/userLogin", userAuthentication, userLogin);
router.post('/userShowAllProblems', userAuthentication, userShowAllProblems)

// TODO : create user route which take user code and check wheather the solved question is correct or not
// router.post('/userSubmitProblemSolution', userAuthetication, (req, res) => {})

module.exports = router