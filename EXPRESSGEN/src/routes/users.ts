import express, {Request, Response, NextFunction}  from 'express';
import { Login, Register } from '../controller/userController';
const router = express.Router();

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
export default router;
