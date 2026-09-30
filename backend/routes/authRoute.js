import express from "express";
import { Login, Me } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', Login);
router.get('/me', verifyToken, Me);

export default router;