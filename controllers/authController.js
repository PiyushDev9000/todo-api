import UserModel from "../models/UserModel.js"
import JWT from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helper/authHelper.js"


export const registerController = async (req, res) => {
   try {
       const {email, password} = req.body
       //validations
       if(!email){
        return res.send({message: 'email is Required'})
       }
       if(!password){
        return res.send({message: 'password is Required'})
       }
       //check user
      const existingUser = await UserModel.findOne({email})

      //existing user
      if(existingUser){
        return res.status(200).send({
            success: false,
            message: 'Already Register please Login'
        })
      }

      //register user
      const hashedPassword = await hashPassword(password)
      //save
      const user = await new UserModel({ email,password:hashedPassword}).save()
    

      res.status(201).send({
        success: true,
        message: 'user registered successfully',
        user

      })
   } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        message: "error in resgistration",
        error
      })
   }
}

export const loginController = async (req, res) =>{
    try {
        const {email, password} = req.body;
        //validdation
       if(!email || !password){
           return res.status(404).send({
           success: false,
           message: "Invalid email or password",
       })
       }
       //check user
       const user = await UserModel.findOne({email})
       if(!user){
           return res.status(404).send({
               success: false,
               message:'email is not registered',
           })
       }

       const match = await comparePassword(password, user.password)
       if(!match){
           return res.status(200).send({
               success: false,
               message:'invalid password',
           })
       }
       //token
       const token = await JWT.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn:'20d'})
       res.status(200).send({
           success:true,
           message: "Login Success",
           user:{
               _id: user._id,
               email: user.email, 
               role: user.role,
           },
           token,
       })
    } catch (error) {
       console.log(error)
     res.status(500).send({
       success:false,
       message: "error in login",
       error
   })
    }
}