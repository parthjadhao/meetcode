"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose')
const mongoose_1 = __importStar(require("mongoose"));
const difficultyEnum = ['easy', 'medium', 'hard'];
const userSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    phoneNumber: String,
    email: String,
    solvedProblems: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Problem' }]
});
const adminSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    phoneNumber: String,
    email: String,
    createdProblems: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Problem' }]
});
const problemSchema = new mongoose_1.Schema({
    title: String,
    difficulty: {
        type: String,
        enum: difficultyEnum,
        require: true
    },
    acceptance: String,
    statement: String,
    discription: String,
    examples: [{
            input: String,
            output: String,
            explanation: String
        }]
});
const User = mongoose_1.default.model('User', userSchema);
const Admin = mongoose_1.default.model('Admin', adminSchema);
const Problem = mongoose_1.default.model('Problem', problemSchema);
// module.exports = {
//   User,
//   Admin,
//   Problem
// }
exports.default = {
    User,
    Admin,
    Problem,
};
