"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthentication_1 = __importDefault(require("../middlewares/adminAuthentication"));
const admin_controller_1 = __importDefault(require("../controller/admin.controller"));
const admin_controller_2 = __importDefault(require("../controller/admin.controller"));
const admin_controller_3 = __importDefault(require("../controller/admin.controller"));
const router = express_1.default.Router();
router.get('/adminLogin', adminAuthentication_1.default.adminAuthentication, admin_controller_1.default.adminLogin);
router.post('/registerAdmin', admin_controller_3.default.registerAdmin);
router.post('/adminUplodProblem', adminAuthentication_1.default.adminAuthentication, admin_controller_2.default.adminUplodProblem);
exports.default = router;
