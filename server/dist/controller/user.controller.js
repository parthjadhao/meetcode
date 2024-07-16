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
const zod_1 = require("zod");
let registerUserInput = zod_1.z.object({
    username: zod_1.z.string().min(1).max(14),
    password: zod_1.z.string().min(8).max(14),
    phoneNumber: zod_1.z.string().min(10).max(10),
    email: zod_1.z.string().email()
});
function registerUser(req, res) {
    var _a, _b, _c, _d, _e;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const parsedInput = registerUserInput.safeParse(req.body);
            if (!parsedInput.success) {
                res.status(411).json({
                    error: parsedInput.error
                });
            }
            const userExist = yield db_2.default.User.findOne({ username: (_a = parsedInput.data) === null || _a === void 0 ? void 0 : _a.username });
            if (userExist) {
                return res.status(400).send("sorry user with this username alreay exist please choose different username");
            }
            const data = {
                username: (_b = parsedInput.data) === null || _b === void 0 ? void 0 : _b.username,
                password: (_c = parsedInput.data) === null || _c === void 0 ? void 0 : _c.password,
                phoneNumber: (_d = parsedInput.data) === null || _d === void 0 ? void 0 : _d.phoneNumber,
                email: (_e = parsedInput.data) === null || _e === void 0 ? void 0 : _e.email
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
// TODO : correct the implementation of userLogin route
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
// ############### Done #######################
// TODO : create route for user to fetch details of specific problem
// ############### Cannot Done ################
// TODO : create route for user to see how his profile in his profile show his ammount of problem solved by user
// TODO : create route for user to submit user solution and check wheather given solution is correct or not
exports.default = {
    registerUser,
    userLogin,
    userShowAllProblems
};
