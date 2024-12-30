import express from "express";
import connectDB from "./db/connect.js";
const app = express();
const PORT = 3000;

connectDB()
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
    
});