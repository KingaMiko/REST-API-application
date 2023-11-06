import express from "express";
import * as usersControllers from "#controllers/index.js";

const router = express.Router();
const { registerUser, loginUser } = usersControllers;

router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
