import jwt, { JwtPayload } from "jsonwebtoken";
import { Response,Request,NextFunction } from "express";
let adminSecret = "lksdfjksdlfjsdkl";
import Admin from "../db/index"; 


function isJwtPayload(value: string | JwtPayload): value is JwtPayload {
  return typeof value === "object" && "username" in value && "password" in value; // Check for required properties
}

async function adminAuthentication(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const adminDetail = await jwt.verify(token, adminSecret) as JwtPayload; // Type assertion (if confident of valid tokens)

      if (!isJwtPayload(adminDetail)) {
        throw new Error("Invalid token format"); // Handle invalid format more specifically
      }

      const adminExist = await Admin.Admin.findOne({ username: adminDetail.username, password: adminDetail.password });

      if (!adminExist) {
        return res.status(400).send("Admin with such username doesn't exist");
      }

      const adminExistedData:string = adminExist.username;
      res.setHeader("admin",adminExistedData)
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