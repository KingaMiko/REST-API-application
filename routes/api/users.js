import express from "express";
import * as usersControllers from "#controllers/index.js";
import { authMiddleware } from "#middlewares/authMiddeware.js";
import { bodyValidate } from "#middlewares/validate.js";
import { upload } from "#middlewares/upload.js";
import userSchema from "#validators/userSchema.js";

const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verifyUser,
} = usersControllers;

router.post("/signup", bodyValidate(userSchema), registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logout);
router.get("/protected", authMiddleware);
router.get("/current", authMiddleware, getCurrentUser);
router.patch("/subscription", authMiddleware, updateSubscription);
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);
router.get("/verify/:verificationToken", verifyUser);

export default router;
