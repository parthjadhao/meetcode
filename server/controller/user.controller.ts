import Problem from "../db";
import User from "../db"
import jwt from "jsonwebtoken"
const userSecret = process.env.USER_SECRET;
import { Response,Request } from "express";

async function registerUser(req:Request,res:Response){
    try {
        const { username, password, phoneNumber, email } = req.body
        if (!username) {
            return res.status(400).send('username is not entered please enter username')
        }
        if (!password) {
            return res.status(400).send('passwrod is not entered please enter passwrod')
        }
        if (!phoneNumber) {
            return res.status(400).send('phone number is not entered please enter phone number')
        }
        if (!email) {
            return res.status(400).send('email is not entered please enter your email');
        }
        const userExist = await User.User.findOne({ username: username })
        if (userExist) {
            return res.status(400).send("sorry user with this username alreay exist please choose different username")
        }
        const data = {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email
        }
        const newUser = new User.User(data)
        await newUser.save()
        if (typeof(userSecret)==="undefined") {
            throw new Error("userSecret is not defined please defined it in you .env file");
            
        }
        const token = jwt.sign({username:data.username,password:data.password},userSecret)
        return res.json({ status: 200, message: "user account created succesfully", token: token })
    } catch (err) {
        return res.send('following error has occured : '+err)
    }
}
function userLogin(req:Request,res:Response){
    res.status(200).send("user logged in succesfully")
}

async function userShowAllProblems(req:Request,res:Response){
    try {
        let problemExist = await Problem.Problem.find({}, { title: 1, statement: 1, _id: 1 })
        if (problemExist) {
            res.json({ status: 200, message: 'all problems fetched sucessfully', problems: problemExist })
        } else {
            res.json({ status: 400, message: 'sorry something went wrong there are not problems available' })
        }
    } catch (err) {
        console.log(err)
    }
}

// TODO : create route for user to submit problem and return response on wheater solved problem is correct or not

export default{
    registerUser,
    userLogin,
    userShowAllProblems
}