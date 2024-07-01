const { Problem, User } = require('../db')
const jwt = require('jsonwebtoken')
const { userSecret} = require('../middlewares/userAuthentication')

async function registerUser(req,res){
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
        const userExist = await User.findOne({ username: username })
        if (userExist) {
            return res.status(400).send("sorry user with this username alreay exist please choose different username")
        }
        const data = {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email
        }
        const newUser = new User(data)
        await newUser.save()
        const token = jwt.sign({ username: data.username, password: data.password }, userSecret)
        return res.json({ status: 200, message: "user account created succesfully", token: token })
    } catch (err) {
        return res.send('following error has occured : '+err)
    }
}
function userLogin(req,res){
    res.status(200).send("user logged in succesfully")
}

async function userShowAllProblems(req,res){
    try {
        problemExist = await Problem.find({}, { title: 1, statement: 1, _id: 1 })
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

module.exports = {
    registerUser,
    userLogin,
    userShowAllProblems
}