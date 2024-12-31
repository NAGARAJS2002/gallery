import v2 from "../utils/cloudinary.js";
import {errorHandler} from "../utils/error.js"
import { imageData } from "../models/imageModel.js";

export const createImage =  async (req,res,next) => {
    try {
     const file = req.file;
    if (file === undefined) {
        return next(errorHandler(400,'please upload a file'));
    }
    const userId = req.user?._id;

    if (!userId) {
        return next(errorHandler(400,'please upload a file'))
    }

    const imagePath = file.path;
    const uploadFile = await v2.uploader.upload(imagePath);

    const newImage = new imageData({
        imageurl: uploadFile.secure_url,
        userid:userId
    });
   const savedImage  = await newImage.save();
   res.status(201).json(savedImage);
    
    } catch (error) {
        next(error);
    }
};

export const getAllImages = async (req, res,next) => {
    try {
      const userId = req.user?._id;
      const findImages = await imageData.find({ userid: userId });
      res.status(200).json(findImages);
  
    }
    catch (err) {
      next(err)
    }
  };


  export const deleteImage = async (req,res,next) => {
    const id = req.params.id;
    try{
    const findImage = await imageData.findById({_id : id});

    if(!findImage)  return next(errorHandler(404,'Image not found'));

    const userId = req.user?._id;
    if (findImage.userid != userId) {
        return next(401, 'User not authorized' )
    }

    await imageData.findByIdAndDelete({_id : id});
     res.status(200).json("Image has been deleted")
    } catch(err){
          next(err)
    }
  }
