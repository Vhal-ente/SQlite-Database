import express, { Request, Response, NextFunction } from 'express';
import { Register } from '../controller/userController';
import e from 'express';


const router = express.Router();


/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.render("Home");
});


router.get('/login', (req: Request, res: Response, next: NextFunction) => {
    res.render("Login");
});

router.get('/sign-out', (req: Request, res: Response, next: NextFunction) => {
    res.render("Register");
});



export default router;