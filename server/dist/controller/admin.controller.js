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
const zod_1 = require("zod");
let registerAdminInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(14),
    password: zod_1.z.string().min(8).max(14),
    phoneNumber: zod_1.z.string().min(10).max(10),
    email: zod_1.z.string().email()
});
let problemExample = zod_1.z.object({
    input: zod_1.z.string().min(1).max(30),
    output: zod_1.z.string().min(1).max(30)
});
let uploadProblemInput = zod_1.z.object({
    title: zod_1.z.string().min(1).max(20),
    statement: zod_1.z.string().min(1).max(35),
    discription: zod_1.z.string().min(1).max(100),
    example: zod_1.z.array(problemExample),
    difficulty: zod_1.z.string().max(6)
});
// TODO : correct the implementation of adminLogin route
function adminLogin(req, res) {
    res.status(200).send('admin logged in succesfully');
}
function registerAdmin(req, res) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = registerAdminInput.safeParse(req.body);
            if (!parsedInput.success) {
                res.status(411).json({
                    error: parsedInput.error
                });
            }
            const adminExist = yield db_1.default.Admin.findOne({ username: (_a = parsedInput.data) === null || _a === void 0 ? void 0 : _a.username });
            if (adminExist) {
                return res.status(400).send("admin with this user already exist please enter another username");
            }
            console.log(adminExist);
            const data = {
                username: (_b = parsedInput.data) === null || _b === void 0 ? void 0 : _b.username,
                password: (_c = parsedInput.data) === null || _c === void 0 ? void 0 : _c.password,
                phoneNumber: (_d = parsedInput.data) === null || _d === void 0 ? void 0 : _d.phoneNumber,
                email: (_e = parsedInput.data) === null || _e === void 0 ? void 0 : _e.email
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
        const parsedInput = uploadProblemInput.safeParse(req.body);
        const admin = req.headers["admin"];
        const problemCreatedAdmin = yield db_1.default.Admin.findOne({ username: admin });
        if (!parsedInput.success) {
            return res.status(400).json({
                error: parsedInput.error
            });
        }
        let problemExist = yield db_2.default.Problem.findOne({ title: parsedInput.data.title, statement: parsedInput.data.statement });
        if (problemExist) {
            return res.json({ status: 400, message: 'problem with same title and problem statemtn is already available', alreadyExistProbles: problemExist });
        }
        let data = {
            title: parsedInput.data.title,
            statement: parsedInput.data.statement,
            examples: parsedInput.data.example,
            discription: parsedInput.data.discription,
            difficulty: parsedInput.data.difficulty
        };
        const newProblem = new db_2.default.Problem(data);
        newProblem.save();
        const updatedAdmin = yield db_1.default.Admin.findOneAndUpdate({ username: problemCreatedAdmin === null || problemCreatedAdmin === void 0 ? void 0 : problemCreatedAdmin.username, }, { $push: { createdProblems: newProblem._id } });
        res.json({ status: 200, message: "problem uploaded succesfully", problemCreatedBy: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.username });
    });
}
// TODO: create routes for showing all the created probleme by admin
function showAllProblem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // step : 1 fetch all the problems with containing admin id present in header admin and store in variable adminCreateProblem
        // step : 2 check wheater the adminCreateProblem is undefined or null if adminCreateProblem is not null or undefined
    });
}
// TODO: create routes for admin modify  or update the creatred problem
// TODO: create routes for admin to delet the problem
exports.default = {
    adminLogin,
    adminUplodProblem,
    registerAdmin
};
