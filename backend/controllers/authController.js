import {User} from "../models/index.js"
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import { JWT_SECRET } from "../config/index.js";
import jwt from "jsonwebtoken"

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

export const login  = async (req,res,next) => {
    const {email , password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) {
            return next(errorHandler(404,'Invalid Credentials'))
        }
        const validPassword = await bcryptjs.compareSync(password,validUser.password);
        if (!validPassword) return next(errorHandler(404,'Wrong Credentials'));

        if (JWT_SECRET == undefined) {
            return next(errorHandler('JWT_SECRET is not defined'))
        };
        jwt.sign({_id:validUser.id},JWT_SECRET,{expiresIn:3600},(err, token) => {
            if (err) throw err;
            res.cookie('access_token',token,{httpOnly:true}).status(201).json(validUser);
        })

    } catch (error) {
        next(error)
    }
};



