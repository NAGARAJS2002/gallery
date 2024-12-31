import multer from "multer";
import{errorHandler} from "../utils/error.js"
const storage = multer.diskStorage({});

const uploadMiddleware = multer({
    storage: storage
}).single('file')

const uploadHandler = (req,res,next) => {
   uploadMiddleware(req,res,(err)=> {
    if (err instanceof multer.MulterError) {
        return next(errorHandler(400,'Multer Error'))
    } else if (err) {
        return next(errorHandler(500,'uknown Error'))
    }
    next();
   })
}

export {uploadHandler};