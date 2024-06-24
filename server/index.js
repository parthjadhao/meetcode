const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express();
const mongoose = require('mongoose')
const port = 3000;

app.use(bodyParser.json())


//defining the mongoose schemas
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

// define model
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Problem = mongoose.model('Problem', problemSchema);

mongoose.connect("mongodb+srv://parthjadhao:sfdsfdxszfdsfsdfsd@cluster0.rvlgksd.mongodb.net/")

let adminSecret = "lksdfjksdlfjsdkl"
let userSecret = "klsdfjklsdfjsdklfj"

//mongoose implemented tested
async function adminAuthetication(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, adminSecret, async (err, adminDetail) => {
    if (err) {
      res.status(404).send("unexpected error while decoding the token inside adminAuthetication")
    }
    adminExist = await Admin.findOne({ username: adminDetail.username, password: adminDetail.password })
    if (!adminExist) {
      res.status(400).send('admin with such username dont exists')
    }
    req.admin = adminDetail
    next()
  })

}
//mongoose implemeted tested
async function userAuthetication(req, res, next) {
  try {
    //const token = req.headers.authroization.split(" ")[1];
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, userSecret, async (err, userDetail) => {
      if (err) {
        res.status(404).send("unexpceted error while decoding the token inside userAutheticate")
      }

      userExist = await User.findOne({ username: userDetail.username, password: userDetail.password })
      if (!userExist) {
        return res.status(400).send('user with such username not exist')
      }
      req.user = userDetail
      next()
    })
    //jwt.verify(token, userSecret, (err, data) => {
    //  if (err) {
    //    console.log(err)
    //    res.status(400).send("unexpected error while decodign the token inside userAutheticate")
    //  }
    //  console.log(data)
    //})
  } catch (err) {
    console.log(err)
  }
}


//mongoose implemented tested route
app.post('/registerUser', async (req, res) => {
  try {
    const { username, password, phoneNumber, email } = req.body
    if (!username) {
      return res.status(400).send('username is not entered please enter username')
    }
    if (!password) {
      return res.status(400).send('passwrod is not entered please enter passwrod')
    }
    if (!phoneNumber) {
      return res.status(400).send('phone number is not entered please enter phone number')
    }
    if (!email) {
      return res.status(400).send('email is not entered please enter your email');
    }
    const userExist = await User.findOne({ username: username })
    if (userExist) {
      return res.status(400).send("sorry user with this username alreay exist please choose different username")
    }
    const data = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      email: email
    }
    const newUser = new User(data)
    await newUser.save()
    const token = jwt.sign({ username: data.username, password: data.password }, userSecret)
    return res.json({ status: 200, message: "user account created succesfully", token: token })
  } catch (err) {
    return res.send('following error has occured : ${err}')
  }
})

// mongoose implemeted tested
app.get("/userLogin", userAuthetication, (req, res) => {
  res.status(200).send("user logged in succesfully")
});

// mongoose implemented tested
app.get('/adminLogin', adminAuthetication, (req, res) => {
  res.status(200).send('admin logged in succesfully')
})

// mongoose implemented and tested
app.post('/registerAdmin', async (req, res) => {
  try {
    const { username, password, phoneNumber, email } = req.body
    if (!username) {
      return res.status(400).send("usernmae is not entered please enter username")
    }
    if (!password) {
      return res.status(400).send("password is not entered please enter password")
    }
    if (!phoneNumber) {
      return res.status(400).send("phone Numbere is not entered please enter phone number")
    }
    if (!email) {
      return res.status(400).send("email is not entered please entere email")
    }
    const adminExist = await Admin.findOne({ username })
    if (adminExist) {
      return res.status(400).send("admin with this user already exist please enter another username")
    }
    console.log(adminExist)
    const data = {
      username: username,
      password: password,
      phoneNumber: phoneNumber,
      email: email
    }
    console.log(data)
    const newAdmin = new Admin(data)
    await newAdmin.save()
    const token = jwt.sign({ username: data.username, password: data.password }, adminSecret)
    return res.json({ status: 200, message: "admin account created succesfully", token: token })
  } catch (err) {
    return res.send(err)
  }
});


// mongoose implemented tested
app.post('/adminUplodProblem', adminAuthetication, async (req, res) => {
  const { title, statement, testCase, discription } = req.body
  const admin = req.admin
  const problemCreatedAdmin = await Admin.findOne({ username: admin.username, password: admin.password })
  if (!title) {
    res.status(400).send("provide problem title")
  }
  if (!statement) {
    res.status(400).send("please provide problem statemtn")
  }
  if (!testCase) {
    res.status(400).send("please provide test case")
  }
  if (!discription) {
    res.status(400).send("please privde problem discription")
  }
  problemExist = await Problem.findOne({ title: title, statement: statement })
  if (problemExist) {
    return res.json({ status: 400, message: 'problem with same title and problem statemtn is already available', alreadyExistProbles: problemExist })
  }
  data = {
    title: title,
    statement: statement,
    testCase: testCase,
    discription: discription
  }
  const newProblem = new Problem(data)
  newProblem.save()
  const updatedAdmin = await Admin.findOneAndUpdate(
    { username: admin.username, password: admin.password },
    { $push: { createdProblems: newProblem._id } },
  )
  res.json({ status: 200, message: "problem uploaded succesfully", problemCreatedBy: updatedAdmin.username })
});

// mongoose implemented tested
app.post('/userShowAllProblems', userAuthetication, async (req, res) => {
  //access the problem collection 
  //check wheather there are problems present or not 
  //if problem are present then fetch all problem with only id statement and title data dont fetch everything
  //send the fetched data as a response
  try {
    problemExist = await Problem.find({}, { title: 1, statement: 1, _id: 1 })
    if (problemExist) {
      res.json({ status: 200, message: 'all problems fetched sucessfully', problems: problemExist })
    } else {
      res.json({ status: 400, message: 'sorry something went wrong there are not problems available' })
    }
  } catch (err) {
    console.log(err)
  }
})

// user authorized route
app.post('/userSubmitProblemSolution', userAuthetication, (req, res) => {
  // take solved problem id and user written code
  // find the testcases of the problems using problem id 
  // execute the problem and see wether it passes the test code or not
  // if all test codes are passesd then 
})
app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})
