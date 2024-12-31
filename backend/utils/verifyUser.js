import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config/index.js";
import {errorHandler} from "../utils/error.js"

const verifyToken = (req,res,next) => {

   const token =  req.cookies.access_token;
   if (!token) return next(errorHandler(401, 'Unauthorized'));
 
   jwt.verify(token,JWT_SECRET,(err,user) =>{
    if (err) return next(errorHandler(403, 'Forbidden'));
    req.user = user;
    next();
   });

   
} 

export {verifyToken};