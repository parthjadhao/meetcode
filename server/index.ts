import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser"
import userRoute from "./routes/user.routes"
import adminRoute from "./routes/user.routes"
import cors from "cors";

const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoute)
app.use('/admin',adminRoute)

if (!process.env.MONGODBURL) {
  throw new Error("server enternal error enable to get connected with database");
}
mongoose.connect(process.env.MONGODBURL)

app.listen(port, () => {
  console.log(`example app listening on port ${port}`)
})
