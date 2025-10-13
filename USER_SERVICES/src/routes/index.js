import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

export const router = Router()

router.post('/register', registerUser)