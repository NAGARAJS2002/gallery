import express from "express";
import connectDB from "./db/connect.js";
import {authRoutes} from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/auth',authRoutes);

connectDB()
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`);
    
});

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error ';
   return  res.status(statusCode).json({
        success: false,
        statusCode,
        message,
   })
})