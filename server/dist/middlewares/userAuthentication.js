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
let userSecret = process.env.USER_SECRET;
const index_1 = __importDefault(require("../db/index"));
function isJwtPayload(value) {
    return typeof value === "object" && "username" in value && "password" in value;
}
function userAuthentication(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeaders = req.headers.authorization;
        if (authHeaders) {
            const token = authHeaders.split(" ")[1];
            if (typeof (userSecret) === "undefined") {
                throw new Error("userSecret key is not defined please defined you own userSecretkey");
            }
            try {
                const userDetail = yield jsonwebtoken_1.default.verify(token, userSecret); //
                if (!isJwtPayload(userDetail)) {
                    return res.status(403).send("Invalid token please reLogin");
                }
                const userExist = yield index_1.default.User.findOne({ username: userDetail.username, password: userDetail.password });
                if (!userExist) {
                    return res.status(400).send("User with such username doesn't exist");
                }
                if (typeof (userExist.username) === "string") {
                    res.setHeader("user", userExist.username);
                }
                else {
                    return res.status(401).send("inccorect decoded userdata formate");
                }
            }
            catch (error) {
                console.log("Error during authentication:", error);
                return res.status(401).send("Unauthorized access");
            }
        }
        else {
            res.sendStatus(401);
        }
    });
}
// module.exports = {
//     userAuthentication,
//     userSecret
// }
exports.default = {
    userAuthentication,
    userSecret
};
