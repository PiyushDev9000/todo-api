import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { todoCreateController,todoUpdateController,todoDeleteController, allTodoTasks } from "../controllers/todoController.js";


const router = express.Router()


router.post('/create-todo',requireSignIn, todoCreateController)
router.patch('/update-todo/:id',requireSignIn  ,todoUpdateController)
router.delete('/delete-todo/:id',requireSignIn,todoDeleteController)
router.get('/allTodoTasks', requireSignIn, isAdmin , allTodoTasks)


  









export default router