const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express();
const userRoute = require('./routes/user.routes.js')
const adminRoute = require('./routes/admin.routes.js')
const cors = require('cors')
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/admin',adminRoute)

mongoose.connect("mongodb+srv://parthjadhao:sfdsfdxszfdsfsdfsd@cluster0.rvlgksd.mongodb.net/")

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})
