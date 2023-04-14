import JWT  from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
//Protected Routes token base
export const requireSignIn = async(req, res, next) =>{
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user = decode
        next();
    } catch (error) {
        console.log(error)

    }

}

//admin access
export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user._id)
        if(user.role !== "admin"){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        }else{
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            message:"error in admin middleare"
        })
    }
}