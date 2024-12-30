import mongoose from "mongoose";
import {mongoURI} from "../config/index.js"
async function connectDB() {
    const uri = mongoURI;

    try {
        if (uri === undefined) {
            throw new Error('MONGO_URI is not defined');
        }
        await mongoose.connect(uri).then(()=> {console.log('connected to mongoDB');
        });
    } catch (error) {
        console.log('Failed to connect to MongoDB', error);
        
    }
    
}

export default connectDB;