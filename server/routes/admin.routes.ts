import express, { Application } from "express"
import adminAuthentication from "../middlewares/adminAuthentication"
import adminLogin from "../controller/admin.controller"
import adminUplodProblem from "../controller/admin.controller";
import registerAdmin from "../controller/admin.controller";

const router = express.Router()

router.get('/adminLogin', adminAuthentication.adminAuthentication, adminLogin.adminLogin)
router.post('/registerAdmin', registerAdmin.registerAdmin);
router.post('/adminUplodProblem', adminAuthentication.adminAuthentication, adminUplodProblem.adminUplodProblem);

export default router