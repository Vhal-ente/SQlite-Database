import { Request, Response, NextFunction } from 'express';
import { registerUserSchema, option, loginUserSchema } from '../utils/utilis';
import { any } from 'joi';
import { UserInstance } from '../Model/userModel';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET as string;


/***======================ANY OTHER FRONTEND FRAMEWORK================= */
// export const Register = async(req: Request, res: Response, next: NextFunction)=> {
// try {
//    const {firstName, email, password, confirm_password} = req.body;
//    const iduuid = uuidv4();
   
// //validate user input with joi
// const validateResult = registerUserSchema.validate(req.body, option);
// console.log(validateResult.error);

// if(validateResult.error) {
//    return res.status(400).json({Error: validateResult.error.details[0].message});

// }

// //Generate salt for Hashing Password

// const passworHash = await bcrypt.hash(password, await bcrypt.genSalt());


// // Check if user already exist in the database
// const user = await UserInstance.findOne({ where: {email: email }});

// if(!user) {
//    const newuser = await UserInstance.create({
//       id: iduuid,
//       firstName,
//       email,
//       password: passworHash
//    });
//       return res.status(201).json({message: 'Registration Successful',newuser});
// }

// return res.status(400).json({message: 'Email Already Exist'});

// } catch (err) {
//    console.log(err);
// }
// };

// //login user
// export const Login = async(req: Request, res: Response, next: NextFunction)=> {
  
//    const {email, password,} = req.body;
//    const iduuid = uuidv4();
   
// //validate user input with joi
// const validateResult = loginUserSchema.validate(req.body, option);
// console.log(validateResult.error);

// if(validateResult.error) {
//    return res.status(400).json({Error: validateResult.error.details[0].message});
// } 

// // get user info  from database before generating token

// const User = (await UserInstance.findOne({ where: {email: email }}
//    )) as unknown as {[key: string]: string};

// const {id } = User;
// // generate token with jwt for authentication for 1 hour for user
// const token = jwt.sign({id}, jwtSecret, {expiresIn: '1h'});

// // compare password already exist with bcrypt
// const isPasswordMatch = await bcrypt.compare(password, User.password);

// if(isPasswordMatch) {
//    return res.status(201).json({message: 'Login Successful', User, token});
// } else {
//    return res.status(400).json({Error: 'Invalid Credentials'});
// }
// }

/***=========================EJS TEMPLATE ENGINE=========================== */

export const Register = async(req: Request, res: Response, next: NextFunction)=> {
try {
   const {firstName, email, password, confirm_password} = req.body;
   const iduuid = uuidv4();
   
//validate user input with joi
const validateResult = registerUserSchema.validate(req.body, option);
//console.log(validateResult.error);

if(validateResult.error) {
   return res.render("Register", 
      { error: validateResult.error.details[0].message
   })
}

//Generate salt for Hashing Password
const passworHash = await bcrypt.hash(password, await bcrypt.genSalt());


// Check if user already exist in the database
const user = await UserInstance.findOne({ where: {email: email }});

if(!user) {
   const newuser = await UserInstance.create({
      id: iduuid,
      firstName,
      email,
      password: passworHash
   });

      return res.redirect('/login');
}

return res.render("Register", { error: 'Email Already Exist'})
} catch (err) {
   console.log(err);
}
};

//login user
export const Login = async(req: Request, res: Response, next: NextFunction)=> {
  
   const {email, password,} = req.body;
   const iduuid = uuidv4();
   
//validate user input with joi
const validateResult = loginUserSchema.validate(req.body, option);
//console.log(validateResult.error);

if(validateResult.error) {
    return res.render("login", 
      { error: validateResult.error.details[0].message
   })
} 

// get user info  from database before generating token

const User = (await UserInstance.findOne({ where: {email: email }}
   )) as unknown as {[key: string]: string};

const {id } = User;
// generate token with jwt for authentication for 1 hour for user
const token = jwt.sign({id}, jwtSecret, {expiresIn: '14d'});

// set cookie for user token
res.cookie('token', token, {
   httpOnly: true,
   maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
});

// compare password already exist with bcrypt
const isPasswordMatch = await bcrypt.compare(password, User.password);

if(isPasswordMatch) {
   return res.render ('Home',
   {message: 'Login Successful', User, token});
} else {
   return res.render ("login", 
   {error: 'Invalid email/password'});
};

};