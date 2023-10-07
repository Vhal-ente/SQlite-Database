// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { UserInstance } from "../Model/userModel";
// import { any } from "joi";

// const jwtSecret = process.env.JWT_SECRET as string;

// export async function auth(req: Request, res: Response, next:NextFunction) {
    
//     const authorization = req.headers.authorization;

//     if (!authorization) {
//         return res.status(401).json({ error: "Please Sign in" });
    
// }

//     const token = authorization.slice(7, authorization.length );

//     let verified = jwt.verify(token,  jwtSecret);

//     if (!verified) {
//         return res.status(401).json({ error: "Invalid Token you can't access this route" });
//     }

// const { id } = verified as { [key: string]: string };

// // check if user exist in the database
// const user = await UserInstance.findOne({ where: { id } });

// if (!user) {
//     return res.status(401).json({ error: "User not found" });
// };
// req.user = verified
// next();
// }

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserInstance } from "../Model/userModel";

const jwtSecret = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: { id: string } | null; // Define the 'user' property and its type
    }
  }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ error: "Please sign in" });
  }

  const token = authorization.slice(7, authorization.length);

  try {
    const verified = jwt.verify(token, jwtSecret) as { id: string };

   // check if user exist in the database 
    const user = await UserInstance.findOne({ where: { id: verified.id } });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token, you can't access this route" });
  }
}
