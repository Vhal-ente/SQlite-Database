import express, {Request, Response, NextFunction} from 'express';
import { createTodo, getTodo } from '../controller/todoController';
import { auth } from '../middleware/auth';
const router = express.Router();

/* GET home page. */
router.post('/create', auth, createTodo); 
router.get('/get-todo', auth, getTodo); 

export default router;
