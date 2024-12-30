import express from "express";
import connectDB from "./db/connect.js";
import {authRoutes} from "./routes/index.js"
const app = express();
const PORT = 3000;



app.use('/api/auth',authRoutes);

connectDB()
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
    
});