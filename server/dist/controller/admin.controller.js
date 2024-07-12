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
const adminSecret = process.env.ADMIN_SECRET;
function adminLogin(req, res) {
    res.status(200).send('admin logged in succesfully');
}
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { username, password, phoneNumber, email } = req.body;
            if (!username) {
                return res.status(400).send("usernmae is not entered please enter username");
            }
            if (!password) {
                return res.status(400).send("password is not entered please enter password");
            }
            if (!phoneNumber) {
                return res.status(400).send("phone Numbere is not entered please enter phone number");
            }
            if (!email) {
                return res.status(400).send("email is not entered please entere email");
            }
            const adminExist = yield db_1.default.Admin.findOne({ username });
            if (adminExist) {
                return res.status(400).send("admin with this user already exist please enter another username");
            }
            console.log(adminExist);
            const data = {
                username: username,
                password: password,
                phoneNumber: phoneNumber,
                email: email
            };
            console.log(data);
            const newAdmin = new db_1.default.Admin(data);
            yield newAdmin.save();
            if (typeof (adminSecret) === "undefined") {
                throw new Error("Please define adminSecret in you .env file");
            }
            const token = jsonwebtoken_1.default.sign({ username: data.username, password: data.password }, adminSecret);
            return res.json({ status: 200, message: "admin account created succesfully", token: token });
        }
        catch (err) {
            return res.send(err);
        }
    });
}
function adminUplodProblem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, statement, examples, discription, difficulty } = req.body;
        const admin = req.headers["admin"];
        const problemCreatedAdmin = yield db_1.default.Admin.findOne({ username: admin });
        if (!title) {
            res.status(400).send("provide problem title");
        }
        if (!statement) {
            res.status(400).send("please provide problem statemtn");
        }
        if (!examples) {
            res.status(400).send("please provide test case");
        }
        if (!discription) {
            res.status(400).send("please privde problem discription");
        }
        if (!difficulty) {
            res.status(400).send("please enter the difficulty of the problem");
        }
        let problemExist = yield db_2.default.Problem.findOne({ title: title, statement: statement });
        if (problemExist) {
            return res.json({ status: 400, message: 'problem with same title and problem statemtn is already available', alreadyExistProbles: problemExist });
        }
        let data = {
            title: title,
            statement: statement,
            examples: examples,
            discription: discription,
            difficulty: difficulty
        };
        const newProblem = new db_2.default.Problem(data);
        newProblem.save();
        const updatedAdmin = yield db_1.default.Admin.findOneAndUpdate({ username: problemCreatedAdmin === null || problemCreatedAdmin === void 0 ? void 0 : problemCreatedAdmin.username, }, { $push: { createdProblems: newProblem._id } });
        res.json({ status: 200, message: "problem uploaded succesfully", problemCreatedBy: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.username });
    });
}
// TODO: create routes for showing all the created probleme by admin
// TODO: create routes for admin modify  or update the creatred problem
// TODO: create routes allowing admin to arrange coding contest
exports.default = {
    adminLogin,
    adminUplodProblem,
    registerAdmin
};
