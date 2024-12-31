import {mongoose ,Schema }from "mongoose";

const imageSchema = new mongoose.Schema({
    imageurl : {type:String, required:true},
    userid: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

const imageData = mongoose.model('Image',imageSchema);

export {imageData};