import express from "express";
import { test } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.get('/test',test);

export {authRoutes};