import express, {Request, Response, NextFunction} from 'express';
import { indexController } from '../controller/indexController';
const router = express.Router();

/* GET home page. */
router.get('/',indexController); 

export default router;
