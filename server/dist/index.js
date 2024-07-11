"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
// const mongoose = require('mongoose')
const mongoose_1 = __importDefault(require("mongoose"));
// const bodyParser = require('body-parser')
const body_parser_1 = __importDefault(require("body-parser"));
// const jwt = require('jsonwebtoken')
//import jwt from "jsonwebtoken";
// const userRoute = require('./routes/user.routes.js')
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// const adminRoute = require('./routes/admin.routes.js')
const user_routes_2 = __importDefault(require("./routes/user.routes"));
// const cors = require('cors')
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/user', user_routes_1.default);
app.use('/admin', user_routes_2.default);
mongoose_1.default.connect("mongodb+srv://parthjadhao:sfdsfdxszfdsfsdfsd@cluster0.rvlgksd.mongodb.net/");
app.listen(port, () => {
    console.log(`example app listening on port ${port}`);
});
