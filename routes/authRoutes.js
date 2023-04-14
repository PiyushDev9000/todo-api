import express  from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { loginController, registerController } from "../controllers/authController.js";

const router = express.Router()


router.post('/register', registerController)
router.post('/login', loginController)


router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
  });  

export default router