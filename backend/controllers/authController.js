import {User} from "../models/index.js"
import bcryptjs from "bcryptjs"
export const register = async (req,res,next) => {
    const {username,email,password} = req.body;
       if (!username || !email || !password) {
           return res.status(400).json({error: "All fields (username, email, password) are required"})
       }
    try {

        const hashedPassword = await bcryptjs.hashSync(password, 10);
        
        await User.create({
            username: username,
            email: email,
            password:hashedPassword
        });

        res.status(201).json('User created successfully!');
    } catch (error) {
        next(error)
    }   
}