import User from "#models/user.js";
import bcrypt from "bcrypt";

export const createUser = async ({ email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ email, password: hashedPassword });
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
