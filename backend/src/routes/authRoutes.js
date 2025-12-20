import express from 'express';
import { signup } from '../controllers/authControllers.js';
const router = express.Router();

router.post("/signup", signup)

router.get("/login", (req,res) =>{
    res.send("Login endpoint");
})

router.get("/loginout", (req,res) =>{
    res.send("Loginout endpoint");
})

export default router;