import mongoose,{Schema} from "mongoose"
const difficultyEnum = ['easy','medium','hard']

const userSchema = new Schema({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  solvedProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
})

const adminSchema = new Schema({
  username: String,
  password: String,
  phoneNumber: String,
  email: String,
  createdProblems: [{ type: Schema.Types.ObjectId, ref: 'Problem' }]
})

const problemSchema = new Schema({
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

export default {
  User,
  Admin,
  Problem,
}