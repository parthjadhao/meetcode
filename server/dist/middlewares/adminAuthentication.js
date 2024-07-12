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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let adminSecret = process.env.ADMIN_SECRET;
const index_1 = __importDefault(require("../db/index"));
function isJwtPayload(value) {
    return typeof value === "object" && "username" in value && "password" in value; // Check for required properties
}
function adminAuthentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            if (typeof (adminSecret) === "undefined") {
                throw new Error("adminSecret key is not available please create adminsecretkey");
            }
            try {
                const adminDetail = yield jsonwebtoken_1.default.verify(token, adminSecret); // Type assertion (if confident of valid tokens)
                if (!isJwtPayload(adminDetail)) {
                    throw new Error("Invalid token format"); // Handle invalid format more specifically
                }
                const adminExist = yield index_1.default.Admin.findOne({ username: adminDetail.username, password: adminDetail.password });
                if (!adminExist) {
                    return res.status(400).send("Admin with such username doesn't exist");
                }
                if (typeof (adminExist.username) === "string") {
                    res.setHeader("admin", adminExist.username);
                }
                else {
                    return res.status(401).send("inccorect decoded userdata formate");
                }
                next();
            }
            catch (error) {
                console.error("Error during authentication:", error); // Log the error for debugging
                return res.status(401).send("Unauthorized access"); // Generic unauthorized response
            }
        }
        else {
            res.sendStatus(401);
        }
    });
}
exports.default = {
    adminAuthentication,
    adminSecret,
};
