// const mongoose = require('mongoose')
import mongoose,{Schema} from "mongoose"
import {Model} from "mongoose"
const difficultyEnum = ['easy','medium','hard']

export interface Iuser{
  username:string,
  password:string,
  phoneNumber:string,
  email:string,
  solvedProblems:Iproblem[]
}
const userSchema = new Schema<Iuser>({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  solvedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
})

export interface Iadmin{
  username: string,
  password: string,
  phoneNumber: string,
  email: string,
  createdProblems:Iproblem[]
}
const adminSchema = new Schema<Iadmin>({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  createdProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
})


export interface Iproblem{
  title: String,
  difficulty: String,
  acceptance: String,
  statement: String,
  discription: String
  examples:{
    input:String,
    output:String
    explanation:String
  }[]
}
const problemSchema = new Schema<Iproblem>({
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
})

const User = mongoose.model<Iuser>('User', userSchema);
const Admin = mongoose.model<Iadmin>('Admin', adminSchema);
const Problem = mongoose.model<Iproblem>('Problem', problemSchema);

// module.exports = {
//   User,
//   Admin,
//   Problem
// }

export default {
  User,
  Admin,
  Problem,
}