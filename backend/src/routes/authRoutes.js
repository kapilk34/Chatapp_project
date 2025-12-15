import express from 'express';
const router = express.Router();

router.get("/signup", (req,res) =>{
    res.send("Signup endpoint");
})

router.get("/login", (req,res) =>{
    res.send("Login endpoint");
})

router.get("/loginout", (req,res) =>{
    res.send("Loginout endpoint");
})

export default router;