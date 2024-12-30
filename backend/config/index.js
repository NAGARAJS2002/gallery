import env from "dotenv";
env.config();

export const mongoURI = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;