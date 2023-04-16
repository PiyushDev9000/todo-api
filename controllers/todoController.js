import express  from "express";
const router = express.Router();
import TodoModel from '../models/TodoModel.js'


// Get all todos
router.get('/', async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user._id });
    res.status(200).json({ todos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export const todoCreateController = async (req, res) => {
    try {
        const { title } = req.body;
        const todo = await TodoModel.create({ title,user: req.user._id });
        res.status(201).json({ todo });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
 }

// Update a todo
export const todoUpdateController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const todo = await TodoModel.findOneAndUpdate({ _id: id, user: req.user._id }, { title, completed }, { new: true });
        if (!todo) throw new Error('Todo not found');
        res.status(200).json({ todo });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}

// Delete a todo
export const todoDeleteController = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await TodoModel.findOneAndDelete({ _id: id, user: req.user._id });
        if (!todo) throw new Error('Todo not found');
        res.status(200).json({ todo });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
}
{/*router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findOneAndDelete({ _id: id, user: req.user._id });
    if (!todo) throw new Error('Todo not found');
    res.status(200).json({ todo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});*/}

export const allTodoTasks = async (req, res) => {
  try {
    const todos = await TodoModel.find();
      res.status(200).json({ todos });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}



export default router
