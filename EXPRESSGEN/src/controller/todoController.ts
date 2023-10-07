import { Request, Response } from 'express';
import { createTodoSchema, option } from '../utils/utilis';
import { TodoInstance } from '../Model/todoModel';
import { v4 as UUIDV4 } from 'uuid';


export const createTodo = async (req: Request | any, res: Response) => {
     try {   
        const verified = req.user;
        console.log(verified, 'user id');

    const id = UUIDV4();
   //console.log('req.body:', req.body);
    
    // validate user input with joi
const validateResult = createTodoSchema.validate(req.body, option);
//console.log(validateResult.error);

if(validateResult.error) {
   return res.status(400).json({error: validateResult.error.details[0].message});
} 
    
const todoRecord = await TodoInstance.create({
    id,
    ...req.body,
    userId: verified.id,
})
return res.status(201).json({msg: 'Todo created successfully', todoRecord});

 } catch (error) {
     console.log(error);
//     //res.status(500).json({Error: error.message});
 }
};

//get all todos
export const getTodo = async (req: Request, res: Response) => {

    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;

    const getAllTodo = await TodoInstance.findAndCountAll({
        limit: limit,
        offset: offset,
        
    });
    return res.status(200).json({message: 'All Todos', 
    count:getAllTodo.count,
    todo: getAllTodo.rows
   
   
    // console.log(error);
    // res.status(500).json({Error: error.message});
});


}