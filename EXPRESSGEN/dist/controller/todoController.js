"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodo = exports.createTodo = void 0;
const utilis_1 = require("../utils/utilis");
const todoModel_1 = require("../Model/todoModel");
const uuid_1 = require("uuid");
const createTodo = async (req, res) => {
    try {
        const verified = req.user;
        console.log(verified, 'user id');
        const id = (0, uuid_1.v4)();
        //console.log('req.body:', req.body);
        // validate user input with joi
        const validateResult = utilis_1.createTodoSchema.validate(req.body, utilis_1.option);
        //console.log(validateResult.error);
        if (validateResult.error) {
            return res.status(400).json({ error: validateResult.error.details[0].message });
        }
        const todoRecord = await todoModel_1.TodoInstance.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        return res.status(201).json({ msg: 'Todo created successfully', todoRecord });
    }
    catch (error) {
        console.log(error);
        //     //res.status(500).json({Error: error.message});
    }
};
exports.createTodo = createTodo;
//get all todos
const getTodo = async (req, res) => {
    const limit = req.query?.limit;
    const offset = req.query?.offset;
    const getAllTodo = await todoModel_1.TodoInstance.findAndCountAll({
        limit: limit,
        offset: offset,
    });
    return res.status(200).json({ message: 'All Todos',
        count: getAllTodo.count,
        todo: getAllTodo.rows
        // console.log(error);
        // res.status(500).json({Error: error.message});
    });
};
exports.getTodo = getTodo;
