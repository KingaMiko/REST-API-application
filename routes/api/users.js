import express from "express";
import * as usersControllers from "#controllers/index.js";
import { authMiddleware } from "#middlewares/authMiddeware.js";

const router = express.Router();
const { registerUser, loginUser, logout, getCurrentUser } = usersControllers;

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
router.get("/protected", authMiddleware);
router.get("/current", authMiddleware, getCurrentUser);

export default router;
