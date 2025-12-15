import express from "express";
const router = express.Router();

router.get("/send", (req, res) => {
    res.send("send message endpoint");
})   

router.get("/receiver", (req, res) => {
    res.send("Reseiver message endpoint");
})    

export default router;