import jwt, { JwtPayload } from "jsonwebtoken"
let userSecret = process.env.USER_SECRET;
import User from "../db/index"
import { Response,Request,NextFunction } from "express"

function isJwtPayload(value:string | JwtPayload): value is JwtPayload{
  return typeof value === "object" && "username" in value && "password" in value;
}

async function userAuthentication(req :Request, res:Response, next:NextFunction) {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    
    if (typeof(userSecret)==="undefined") {
      throw new Error("userSecret key is not defined please defined you own userSecretkey");
    }
    try {
      const userDetail = await jwt.verify(token,userSecret) as JwtPayload//
      
      if (!isJwtPayload(userDetail)) {
        return res.status(403).send("Invalid token please reLogin")
      }
      const userExist = await User.User.findOne({username:userDetail.username,password:userDetail.password})

      if(!userExist){
        return res.status(400).send("User with such username doesn't exist")
      }
      if (typeof(userExist.username)==="string") {
        res.setHeader("user",userExist.username)
      }
      else{
        return res.status(401).send("inccorect decoded userdata formate")
      }
    } catch (error) {
      console.log("Error during authentication:",error)
      return res.status(401).send("Unauthorized access");
    }
  }else{
    res.sendStatus(401)
  }
  }

// module.exports = {
//     userAuthentication,
//     userSecret
// }

export default {
  userAuthentication,
  userSecret
}