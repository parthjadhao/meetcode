import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
let adminSecret = process.env.ADMIN_SECRET;
import Admin from "../db/index";


function isJwtPayload(value: string | JwtPayload): value is JwtPayload {
  return typeof value === "object" && "username" in value && "password" in value; // Check for required properties
}

async function adminAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    if (typeof (adminSecret) === "undefined") {
      throw new Error("adminSecret key is not available please create adminsecretkey");
    }
    try {
      const adminDetail = await jwt.verify(token, adminSecret) as JwtPayload; // Type assertion (if confident of valid tokens)

      if (!isJwtPayload(adminDetail)) {
        throw new Error("Invalid token format"); // Handle invalid format more specifically
      }

      const adminExist = await Admin.Admin.findOne({ username: adminDetail.username, password: adminDetail.password });

      if (!adminExist) {
        return res.status(400).send("Admin with such username doesn't exist");
      }
      if (typeof(adminExist.username)==="string") {
        res.setHeader("admin",adminExist.username)
      }else{
        return res.status(401).send("inccorect decoded userdata formate")
      }
      next();
    } catch (error) {
      console.error("Error during authentication:", error); // Log the error for debugging
      return res.status(401).send("Unauthorized access"); // Generic unauthorized response
    }
  } else {
    res.sendStatus(401);
  }
}

export default {
  adminAuthentication,
  adminSecret,
};