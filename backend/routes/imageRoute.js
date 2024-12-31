import express from "express";
import { createImage,deleteImage,getAllImages  } from "../controllers/imageController.js";
import { verifyToken } from "../utils/verifyUser.js";
import { uploadHandler } from "../utils/multer.js";


const imageRoutes = express.Router();

imageRoutes.post('/upload',verifyToken,uploadHandler,createImage);
imageRoutes.get('/all',verifyToken,getAllImages);
imageRoutes.delete('/delete/:id',verifyToken,deleteImage);


export {imageRoutes};