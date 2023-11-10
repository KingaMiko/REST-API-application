import express from "express";
import * as usersControllers from "#controllers/index.js";
import { authMiddleware } from "#middlewares/authMiddeware.js";
import { bodyValidate } from "#middlewares/validate.js";
import userSchema from "#validators/userSchema.js";

const router = express.Router();
const { registerUser, loginUser, logout, getCurrentUser, updateSubscription } =
  usersControllers;

router.post("/signup", bodyValidate(userSchema), registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
router.get("/protected", authMiddleware);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/subscription", authMiddleware, updateSubscription);

export default router;
