import Admin from "../db"
import Problem from "../db"
import jwt from "jsonwebtoken";
const adminSecret = process.env.ADMIN_SECRET
import { Request,Response } from "express";
import {z} from "zod"

let registerAdminInput = z.object({
    username: z.string().min(1).max(14),
    password: z.string().min(8).max(14),
    phoneNumber: z.string().min(10).max(10),
    email: z.string().email()
})

let problemExample = z.object({
    input: z.string().min(1).max(30),
    output: z.string().min(1).max(30)
})

let uploadProblemInput = z.object({
    title: z.string().min(1).max(20),
    statement: z.string().min(1).max(35),
    discription: z.string().min(1).max(100),
    example: z.array(problemExample),
    difficulty: z.string().max(6)
})
// TODO : correct the implementation of adminLogin route

function adminLogin(req:Request, res:Response) {
    res.status(200).send('admin logged in succesfully')
}

async function registerAdmin(req:Request, res:Response) {
    try {
        const parsedInput  = registerAdminInput.safeParse(req.body);
        if(!parsedInput.success){
            res.status(411).json({
                error : parsedInput.error
            })
        }
        const adminExist = await Admin.Admin.findOne({ username : parsedInput.data?.username })
        if (adminExist) {
            return res.status(400).send("admin with this user already exist please enter another username")
        }
        console.log(adminExist)
        const data = {
            username: parsedInput.data?.username,
            password: parsedInput.data?.password,
            phoneNumber: parsedInput.data?.phoneNumber,
            email: parsedInput.data?.email
        }
        console.log(data)
        const newAdmin = new Admin.Admin(data)
        await newAdmin.save()
        if (typeof(adminSecret)==="undefined") {
            throw new Error("Please define adminSecret in you .env file");
        }
        const token = jwt.sign({ username: data.username, password: data.password }, adminSecret)
        return res.json({ status: 200, message: "admin account created succesfully", token: token })
    } catch (err) {
        return res.send(err)
    }
}

async function adminUplodProblem(req:Request, res:Response) {
    const parsedInput = uploadProblemInput.safeParse(req.body)
    const admin = req.headers["admin"];
    const problemCreatedAdmin = await Admin.Admin.findOne({ username: admin})
    if (!parsedInput.success) {
        return res.status(400).json({
            error: parsedInput.error
        })
    }
    let problemExist = await Problem.Problem.findOne({ title: parsedInput.data.title, statement: parsedInput.data.statement })
    if (problemExist) {
        return res.json({ status: 400, message: 'problem with same title and problem statemtn is already available', alreadyExistProbles: problemExist })
    }
    let data = {
        title: parsedInput.data.title,
        statement: parsedInput.data.statement,
        examples: parsedInput.data.example,
        discription: parsedInput.data.discription,
        difficulty: parsedInput.data.difficulty
    }
    const newProblem = new Problem.Problem(data)
    newProblem.save()
    const updatedAdmin = await Admin.Admin.findOneAndUpdate(
        { username: problemCreatedAdmin?.username,},
        { $push: { createdProblems: newProblem._id } },
    )
    res.json({ status: 200, message: "problem uploaded succesfully", problemCreatedBy: updatedAdmin?.username })

}
// TODO: create routes for showing all the created probleme by admin
async function showAllProblem(req:Request,res:Response) {
    // step : 1 fetch all the problems with containing admin id present in header admin and store in variable adminCreateProblem
    // step : 2 check wheater the adminCreateProblem is undefined or null if adminCreateProblem is not null or undefined
}

// TODO: create routes for admin modify  or update the creatred problem

// TODO: create routes for admin to delet the problem

export default {
    adminLogin,
    adminUplodProblem,
    registerAdmin
}