import { v4 as uuidv4 } from "uuid";
import {
  createUser,
  findUserByEmail,
} from "#repository/users/usersRepository.js";

import { sendVerificationEmail } from "#email/emailSender.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }
    const verificationToken = uuidv4();
    const newUser = await createUser({ email, password, verificationToken });
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
