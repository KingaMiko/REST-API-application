import express from "express";

import { authMiddleware } from "#middlewares/authMiddeware.js";
import * as usersControllers from "#controllers/index.js";
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
  resendVerificationEmail,
} = usersControllers;
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags: [User]
 *     summary: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully registered.
 *       400:
 *         description: Invalid input data.
 */
router.post("/signup", bodyValidate(userSchema), registerUser);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [User]
 *     summary: Login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in.
 *       401:
 *         description: Invalid credentials.
 */

router.post("/login", loginUser);
/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags: [User]
 *     summary: Logout a user.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       204:
 *         description: User successfully logged out.
 */
router.post("/logout", authMiddleware, logout);
router.get("/protected", authMiddleware);
/**
 * @swagger
 * /api/users/current:
 *   get:
 *     tags: [User]
 *     summary: Get the current user's data.
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: Current user data.
 *       401:
 *         description: Unauthorized.
 */
router.get("/current", authMiddleware, getCurrentUser);
/**
 * @swagger
 * /api/users/subscription:
 *   patch:
 *     tags: [User]
 *     summary: Update user subscription.
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Subscription updated.
 *       401:
 *         description: Unauthorized.
 */
router.patch("/subscription", authMiddleware, updateSubscription);
/**
 * @swagger
 * /api/users/avatars:
 *   patch:
 *     tags: [User]
 *     summary: Update user avatar.
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated successfully.
 *       400:
 *         description: Bad Request - No file uploaded.
 *       401:
 *         description: Unauthorized - User not authenticated.
 */
router.patch("/avatars", authMiddleware, upload.single("avatar"), updateAvatar);
/**
 * @swagger
 * /api/users/verify/{verificationToken}:
 *   get:
 *     tags: [User]
 *     summary: Verify user email.
 *     parameters:
 *       - in: path
 *         name: verificationToken
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified.
 *       404:
 *         description: User not found or already verified.
 */
router.get("/verify/:verificationToken", verifyUser);
/**
 * @swagger
 * /api/users/verify/:
 *   post:
 *     tags: [User]
 *     summary: Resend verification email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Verification email resent.
 *       400:
 *         description: Invalid input or user already verified.
 */
router.post("/verify/", resendVerificationEmail);

export default router;
