"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const user_routes_2 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/user', user_routes_1.default);
app.use('/admin', user_routes_2.default);
if (!process.env.MONGODBURL) {
    throw new Error("server enternal error enable to get connected with database");
}
mongoose_1.default.connect(process.env.MONGODBURL);
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});
