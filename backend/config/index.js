import env from "dotenv";
env.config();

export const mongoURI = process.env.MONGO_URI;