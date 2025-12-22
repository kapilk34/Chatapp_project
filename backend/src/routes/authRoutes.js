import express from 'express';
import { signup, login, logout, updateProfile } from '../controllers/authControllers.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { arcjetProtection } from '../middlewares/arcjetMiddleware.js';
const router = express.Router();

router.use(arcjetProtection);
router.post("/signup", signup)
router.post("/login", arcjetProtection, login);
router.post("/logout", logout);
router.put("/update_profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req,res) => res.status(200).json(req.user));

export default router;