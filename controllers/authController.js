import UserModel from "../models/UserModel.js"
import JWT from "jsonwebtoken"
import { comparePassword, hashPassword } from "../helper/authHelper.js"


export const registerController = async (req, res) => {
   try {
       const {name, email, password} = req.body
       //validations
       if(!name){
        return res.send({message: 'Name is Required'})
       }
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
      const user = await new UserModel({name, email,password:hashedPassword}).save()
    

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