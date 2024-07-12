import express from "express"
import Problem from "../db"
import User from "../db"
import userSecret from "../middlewares/userAuthentication";
import userAuthentication from "../middlewares/userAuthentication"
import registerUser from "../controller/user.controller"
import userLogin from "../controller/user.controller"
import userShowAllProblems from "../controller/user.controller"
const router = express.Router()

router.post('/registerUser', registerUser.registerUser)
router.get("/userLogin",userAuthentication.userAuthentication,userLogin.userLogin );
router.post('/userShowAllProblems', userAuthentication.userAuthentication, userShowAllProblems.userShowAllProblems)

// TODO : create user route which take user code and check wheather the solved question is correct or not

export default router