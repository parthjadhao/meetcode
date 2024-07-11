"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const userAuthentication_1 = __importDefault(require("../middlewares/userAuthentication"));
// const { registerUser,userLogin,userShowAllProblems } = require('../controller/user.controller.js')
const user_controller_1 = __importDefault(require("../controller/user.controller"));
const user_controller_2 = __importDefault(require("../controller/user.controller"));
const user_controller_3 = __importDefault(require("../controller/user.controller"));
const router = express_1.default.Router();
router.post('/registerUser', user_controller_1.default.registerUser);
// router.get("/userLogin", userAuthentication, userLogin);
router.get("/userLogin", userAuthentication_1.default.userAuthentication, user_controller_2.default.userLogin);
router.post('/userShowAllProblems', userAuthentication_1.default.userAuthentication, user_controller_3.default.userShowAllProblems);
// TODO : create user route which take user code and check wheather the solved question is correct or not
// router.post('/userSubmitProblemSolution', userAuthetication, (req, res) => {})
// module.exports = router
exports.default = router;
