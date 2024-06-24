// controllers/todoController.js
const Todo = require('../models/Todo');

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const {title,description}=req.body; 
        const response = await Todo.create({ title, description });

        const todo=await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updatedAt:Date.now()},
        )
        
        res.status(200).json({
            success: true,
            data: todo,
            message: 'updated Successfully'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: 'internal server error',
            message: err.message,
        });
    }
};
