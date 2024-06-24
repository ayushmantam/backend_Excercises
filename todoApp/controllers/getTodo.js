// controllers/todoController.js
const { response } = require('express');
const Todo = require('../models/Todo');

exports.getTodo = async (req, res) => {
    try {
        //fetch all todo items from database
        const todos = await Todo.find({});
        //response
        res.status(200)
            .json({
                sucess: true,
                data: todos,
                message: "Entire Todo Data is fecthed",
            })
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            })
    }
};


exports.getTodoById = async (req, res) => {
    try {
        //fetch all todo items from database by id

        //extract id from parameters
        const id = req.params.id;
        const todo = await Todo.findById({ _id: id });
        //response
        //data for given id not found
        if (!todo) {
            return res.status(400).json({
                success: false,
                message: "No Data Found with Given Id",
            })
        }
        res.status(200)
            .json({
                sucess: true,
                data: todo,
                message: `Todo ${id} is fecthed of your entered id`,
            })
    } catch (err) {
        console.error(err);
        res.status(500)
            .json({
                success: false,
                error: err.message,
                message: 'Server Error',
            })
    }
};

