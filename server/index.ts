// const express = require('express')
import express from "express";
// const mongoose = require('mongoose')
import mongoose from "mongoose";
// const bodyParser = require('body-parser')
import bodyParser from "body-parser"
// const jwt = require('jsonwebtoken')
//import jwt from "jsonwebtoken";
// const userRoute = require('./routes/user.routes.js')
import userRoute from "./routes/user.routes"
// const adminRoute = require('./routes/admin.routes.js')
import adminRoute from "./routes/user.routes"
// const cors = require('cors')
import cors from "cors";
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/admin',adminRoute)

mongoose.connect("mongodb+srv://parthjadhao:sfdsfdxszfdsfsdfsd@cluster0.rvlgksd.mongodb.net/")

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})
