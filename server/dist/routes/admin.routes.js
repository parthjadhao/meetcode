"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
// const { Admin, Problem } = require('../db')
// import{Admin,Problem} from "../db"
// const { adminAuthentication } = require('../middlewares/adminAuthentication')
const adminAuthentication_1 = __importDefault(require("../middlewares/adminAuthentication"));
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const admin_controller_2 = __importDefault(require("../controller/admin.controller"));
const admin_controller_3 = __importDefault(require("../controller/admin.controller"));
// const { adminLogin, adminUplodProblem, registerAdmin } = require('../controller/admin.controller.js')
const router = express_1.default.Router();
router.get('/adminLogin', adminAuthentication_1.default.adminAuthentication, admin_controller_1.default.adminLogin);
router.post('/registerAdmin', admin_controller_3.default.registerAdmin);
router.post('/adminUplodProblem', adminAuthentication_1.default.adminAuthentication, admin_controller_2.default.adminUplodProblem);
// module.exports = router
exports.default = router;
