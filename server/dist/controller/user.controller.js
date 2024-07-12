"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const db_2 = __importDefault(require("../db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSecret = process.env.USER_SECRET;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, phoneNumber, email } = req.body;
            if (!username) {
                return res.status(400).send('username is not entered please enter username');
            }
            if (!password) {
                return res.status(400).send('passwrod is not entered please enter passwrod');
            }
            if (!phoneNumber) {
                return res.status(400).send('phone number is not entered please enter phone number');
            }
            if (!email) {
                return res.status(400).send('email is not entered please enter your email');
            }
            const userExist = yield db_2.default.User.findOne({ username: username });
            if (userExist) {
                return res.status(400).send("sorry user with this username alreay exist please choose different username");
            }
            const data = {
                username: username,
                password: password,
                phoneNumber: phoneNumber,
                email: email
            };
            const newUser = new db_2.default.User(data);
            yield newUser.save();
            if (typeof (userSecret) === "undefined") {
                throw new Error("userSecret is not defined please defined it in you .env file");
            }
            const token = jsonwebtoken_1.default.sign({ username: data.username, password: data.password }, userSecret);
            return res.json({ status: 200, message: "user account created succesfully", token: token });
        }
        catch (err) {
            return res.send('following error has occured : ' + err);
        }
    });
}
function userLogin(req, res) {
    res.status(200).send("user logged in succesfully");
}
function userShowAllProblems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let problemExist = yield db_1.default.Problem.find({}, { title: 1, statement: 1, _id: 1 });
            if (problemExist) {
                res.json({ status: 200, message: 'all problems fetched sucessfully', problems: problemExist });
            }
            else {
                res.json({ status: 400, message: 'sorry something went wrong there are not problems available' });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
// TODO : create route for user to submit problem and return response on wheater solved problem is correct or not
exports.default = {
    registerUser,
    userLogin,
    userShowAllProblems
};
