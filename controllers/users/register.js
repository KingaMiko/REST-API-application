import {
  createUser,
  findUserByEmail,
} from "#repository/users/usersRepository.js";
import userSchema from "#validators/userSchema.js";

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ message: "Email in use" });
    }

    const newUser = await createUser({ email, password });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
