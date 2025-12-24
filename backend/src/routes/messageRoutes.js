import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/messageControllers.js";
import { protectRoute } from "../middlewares/authMiddleware.js";
import { arcjetProtection } from "../middlewares/arcjetMiddleware.js";

const router = express.Router();
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage)

export default router;