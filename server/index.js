const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express();
const port = 3000;

app.use(bodyParser.json())

let user = []
let admin = []
let problems = []
let userIndex = 0
let adminIndex = 0
let problemIndex = 0

let adminSecret = "lksdfjksdlfjsdkl"
let userSecret = "klsdfjklsdfjsdklfj"

function adminAutheticate(req, res, next) {
  const token = req.headers.authorization.split(" ")[1]
  jwt.verify(token, adminSecret, { expiress: '1hr' }, (err, adminDetail) => {
    if (err) {
      res.status(404).send("unexpected error while decoding the token inside adminAuthetication")
    }
    for (let i = 0; i < admin.length; i++) {
      if (admin[i].id == adminDetail.id && admin[i].username == adminDetail.username) {
        req.admin = adminDetail
        next()
      }
    }
  })
}


function userAutheticate(req, res, next) {
  const token = req.headers.authroization.split(" ")[1]
  jwt.verify(token, userSecret, { expiress: '1hr' }, (err, userDetail) => {
    if (err) {
      res.status(404).send("unexpected error while decoding the token inside userAutheticate")
    }
    for (let i = 0; i < user.length; i++) {
      if (user[i].id == userDetail.id && user[i].username == userDetail.username) {
        req.user = userDetail
        next()
      }

    }
  })
}

app.post('/registerUser', (req, res) => {
  const { username, password, phoneNumber, email } = req.body
  if (!username) {
    res.status(400).send("usernmae is not entered please enter username")
  }
  if (!password) {
    res.status(400).send("password is not entered please enter password")
  }
  if (!phoneNumber) {
    res.status(400).send("phone Numbere is not entered please enter phone number")
  }
  if (!email) {
    res.status(400).send("email is not entered please entere email")
  }
  const registerUserDetail = {
    id: userIndex,
    username: username,
    password: password,
    phoneNumber: phoneNumber,
    email: email
  }
  user[userIndex] = registerUserDetail
  userIndex++
  const token = jwt.sign({ username: registerUserDetail.username, id: registerUserDetail.id }, userSecret)
  res.json({ message: "user account created succesfully", token: token })
});

app.get("/userLogin", (req, res) => {
  const { username, password } = req.body
  for (let index = 0; index < user.length; index++) {
    if (user[index].username == username && user[index].password) {
      res.status(200).send("user logged in succefully")
    }
  }
  res.status(400).send("invalid username and passowrd plese try again")
});

app.post('/registerAdmin', (req, res) => {
  const { username, password, phoneNumber, email } = req.body
  if (!username) {
    res.status(400).send("usernmae is not entered please enter username")
  }
  if (!password) {
    res.status(400).send("password is not entered please enter password")
  }
  if (!phoneNumber) {
    res.status(400).send("phone Numbere is not entered please enter phone number")
  }
  if (!email) {
    res.status(400).send("email is not entered please entere email")
  }
  const registerAdminDetail = {
    id: adminIndex,
    username: username,
    password: password,
    phoneNumber: phoneNumber,
    email: email
  }
  admin[adminIndex] = registerAdminDetail
  adminIndex++
  const data = { id: registerAdminDetail.id, username: registerAdminDetail.username }
  const token = jwt.sign(data, adminSecret)
  res.json({ message: "admin account created succesfully", token: token })
});


// admin authroized route
app.post('/adminUplodProblem', adminAutheticate, (req, res) => {
  const { title, statement, testCase, discription } = req.body
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
  uplodeProblems = {
    id: problemIndex,
    title: title,
    statement: statement,
    testCase: testCase,
    discription: discription
  }
  problems[problemIndex] = uplodeProblems
  problemIndex++
  // res.status(200).send("problem uploaded succesfully")
  res.json({ status: 200, message: "problem uploaded succesfully" })
  console.log(problems)
});

// user authorized route
app.post('/userShowAllProblems', userAutheticate, (req, res) => {
  //access the problem array and see is it empty or not
  //if problem array is empty it will send sorry something wrong no one posted problems
  // other wise it will pass all the problems
  if (!problems) {
    res.json({ status: 200, message: "sorry something went wrong there is not problems available" })
  }
  res.json({ status: 200, data: problems })
})

// user authorized route
app.post('/userSubmitProblemSolution', userAutheticate, (req, res) => {
  // take solved problem id and user written code
  // find the testcases of the problems using problem id 
  // execute the problem and see wether it passes the test code or not
  // if all test codes are passesd then 
})
app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})
