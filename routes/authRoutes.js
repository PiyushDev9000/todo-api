import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { registerController } from "../controllers/authController.js";

const router = express.Router()

//REGISTER || METHOD PORT
router.post('/register', registerController)









export default router