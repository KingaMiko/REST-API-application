import {
  findUserByEmail,
  updateToken,
} from "#repository/users/usersRepository.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userSchema from "#validators/userSchema.js";
import { ErrorHandler } from "#middlewares/errorHandler.js";

export const loginUser = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, "Validation error");
    }

    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new ErrorHandler(401, "Email or password is wrong");
    }

    console.log("Porównywanie haseł dla użytkownika:", user.email);
    console.log("Hasło wprowadzone przez użytkownika:", password);
    console.log("Zahashowane hasło z bazy danych:", user.password);
    console.log("Logowanie hasła:", password);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Czy hasło się zgadza:", isMatch);
    if (!isMatch) {
      throw new ErrorHandler(401, "Email or password is wrong");
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "12h",
    });

    await updateToken(user._id, token);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};
