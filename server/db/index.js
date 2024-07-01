const mongoose = require('mongoose')

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
    statement: String,
    discription: String,
    testCase: [String]
  })
  
  const User = mongoose.model('User', userSchema);
  const Admin = mongoose.model('Admin', adminSchema);
  const Problem = mongoose.model('Problem', problemSchema);

  module.exports = {
    User,
    Admin,
    Problem
  }