import Problem from "../db";
import User from "../db"
import jwt from "jsonwebtoken"
const userSecret = process.env.USER_SECRET;
import { Response,Request } from "express";
import {z} from "zod";

let registerUserInput = z.object({
    username: z.string().min(1).max(14),
    password: z.string().min(8).max(14),
    phoneNumber: z.string().min(10).max(10),
    email: z.string().email()
})

async function registerUser(req:Request,res:Response){
    try {
        const parsedInput  = registerUserInput.safeParse(req.body);
        if(!parsedInput.success){
            res.status(411).json({
                error : parsedInput.error
            })
        }
        const userExist = await User.User.findOne({ username: parsedInput.data?.username })
        if (userExist) {
            return res.status(400).send("sorry user with this username alreay exist please choose different username")
        }
        const data = {
            username: parsedInput.data?.username,
            password: parsedInput.data?.password,
            phoneNumber: parsedInput.data?.phoneNumber,
            email: parsedInput.data?.email
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

// TODO : correct the implementation of userLogin route
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

// ############### Done #######################
// TODO : create route for user to fetch details of specific problem

// ############### Cannot Done ################
// TODO : create route for user to see how his profile in his profile show his ammount of problem solved by user
// TODO : create route for user to submit user solution and check wheather given solution is correct or not

export default{
    registerUser,
    userLogin,
    userShowAllProblems
}