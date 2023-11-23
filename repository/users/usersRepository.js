import bcrypt from "bcrypt";
import gravatar from "gravatar";

import User from "#models/user.js";

export const createUser = async ({ email, password, verificationToken }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const avatarURL = gravatar.url(email, { s: "250", r: "pg", d: "mm" });
  const user = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  return user;
};
export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const updateToken = (userId, token) => {
  return User.findByIdAndUpdate(userId, { token });
};

export const unsetUserToken = async (userId) => {
  return User.findByIdAndUpdate(userId, { token: null }, { new: true });
};

export const updateUserAvatar = (userId, avatarURL) => {
  return User.findByIdAndUpdate(userId, { avatarURL }, { new: true });
};
