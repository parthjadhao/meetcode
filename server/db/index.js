const mongoose = require('mongoose')
const difficultyEnum = ['easy','medium','hard']
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  solvedProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
})

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  createdProblems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }]
})

const problemSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Problem = mongoose.model('Problem', problemSchema);

module.exports = {
  User,
  Admin,
  Problem
}