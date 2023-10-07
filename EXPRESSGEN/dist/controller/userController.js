"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = exports.Register = void 0;
const utilis_1 = require("../utils/utilis");
const userModel_1 = require("../Model/userModel");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
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
const Register = async (req, res, next) => {
    try {
        const { firstName, email, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        //validate user input with joi
        const validateResult = utilis_1.registerUserSchema.validate(req.body, utilis_1.option);
        //console.log(validateResult.error);
        if (validateResult.error) {
            return res.render("Register", { error: validateResult.error.details[0].message
            });
        }
        //Generate salt for Hashing Password
        const passworHash = await bcryptjs_1.default.hash(password, await bcryptjs_1.default.genSalt());
        // Check if user already exist in the database
        const user = await userModel_1.UserInstance.findOne({ where: { email: email } });
        if (!user) {
            const newuser = await userModel_1.UserInstance.create({
                id: iduuid,
                firstName,
                email,
                password: passworHash
            });
            return res.redirect('/login');
        }
        return res.render("Register", { error: 'Email Already Exist' });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
//login user
const Login = async (req, res, next) => {
    const { email, password, } = req.body;
    const iduuid = (0, uuid_1.v4)();
    //validate user input with joi
    const validateResult = utilis_1.loginUserSchema.validate(req.body, utilis_1.option);
    //console.log(validateResult.error);
    if (validateResult.error) {
        return res.render("login", { error: validateResult.error.details[0].message
        });
    }
    // get user info  from database before generating token
    const User = (await userModel_1.UserInstance.findOne({ where: { email: email } }));
    const { id } = User;
    // generate token with jwt for authentication for 1 hour for user
    const token = jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: '14d' });
    // set cookie for user token
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
    });
    // compare password already exist with bcrypt
    const isPasswordMatch = await bcryptjs_1.default.compare(password, User.password);
    if (isPasswordMatch) {
        return res.render('Home', { message: 'Login Successful', User, token });
    }
    else {
        return res.render("login", { error: 'Invalid email/password' });
    }
    ;
};
exports.Login = Login;
