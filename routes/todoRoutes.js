import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { todoCreateController,todoUpdateController,todoDeleteController } from "../controllers/todoController.js";


const router = express.Router()


router.post('/create-todo',requireSignIn, todoCreateController)
router.patch('/update-todo/:id',requireSignIn  ,todoUpdateController)
router.delete('/delete-todo/:id',requireSignIn,todoDeleteController)


  









export default router