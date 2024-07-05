const { Admin, Problem } = require('../db')
const jwt = require('jsonwebtoken')
const { adminSecret} = require('../middlewares/adminAuthentication')
const { registerUser } = require('./user.controller')

function adminLogin(req, res) {
    res.status(200).send('admin logged in succesfully')
}

async function registerAdmin(req, res) {
    try {
        const { username, password, phoneNumber, email } = req.body
        if (!username) {
            return res.status(400).send("usernmae is not entered please enter username")
        }
        if (!password) {
            return res.status(400).send("password is not entered please enter password")
        }
        if (!phoneNumber) {
            return res.status(400).send("phone Numbere is not entered please enter phone number")
        }
        if (!email) {
            return res.status(400).send("email is not entered please entere email")
        }
        const adminExist = await Admin.findOne({ username })
        if (adminExist) {
            return res.status(400).send("admin with this user already exist please enter another username")
        }
        console.log(adminExist)
        const data = {
            username: username,
            password: password,
            phoneNumber: phoneNumber,
            email: email
        }
        console.log(data)
        const newAdmin = new Admin(data)
        await newAdmin.save()
        const token = jwt.sign({ username: data.username, password: data.password }, adminSecret)
        return res.json({ status: 200, message: "admin account created succesfully", token: token })
    } catch (err) {
        return res.send(err)
    }
}

async function adminUplodProblem(req, res) {
    const { title, statement, examples, discription,difficulty } = req.body
    const admin = req.admin
    const problemCreatedAdmin = await Admin.findOne({ username: admin.username, password: admin.password })
    if (!title) {
        res.status(400).send("provide problem title")
    }
    if (!statement) {
        res.status(400).send("please provide problem statemtn")
    }
    if (!examples) {
        res.status(400).send("please provide test case")
    }
    if (!discription) {
        res.status(400).send("please privde problem discription")
    }
    if (!difficulty){
        res.status(400).send("please enter the difficulty of the problem")
    }
    problemExist = await Problem.findOne({ title: title, statement: statement })
    if (problemExist) {
        return res.json({ status: 400, message: 'problem with same title and problem statemtn is already available', alreadyExistProbles: problemExist })
    }
    data = {
        title: title,
        statement: statement,
        examples: examples,
        discription: discription,
        difficulty: difficulty
    }
    const newProblem = new Problem(data)
    newProblem.save()
    const updatedAdmin = await Admin.findOneAndUpdate(
        { username: problemCreatedAdmin.username, password: problemCreatedAdmin.password },
        { $push: { createdProblems: newProblem._id } },
    )
    res.json({ status: 200, message: "problem uploaded succesfully", problemCreatedBy: updatedAdmin.username })

}
// TODO: create routes for showing all the created probleme by admin

// TODO: create routes for admin modify  or update the creatred problem

// TODO: create routes allowing admin to arrange coding contest
module.exports = {
    adminLogin,
    adminUplodProblem,
    registerAdmin
}