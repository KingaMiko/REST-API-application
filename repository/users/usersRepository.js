import User from "#models/user.js";
import bcrypt from "bcrypt";

export const createUser = async ({ email, password }) => {
  // To powinno być hasło w postaci zwykłego tekstu
  console.log("Original password:", password);

  // Hashowanie hasła
  const hashedPassword = await bcrypt.hash(password, 12);
  console.log("Hashed password:", hashedPassword);

  // Tworzenie użytkownika z zahashowanym hasłem
  const user = await User.create({ email, password: hashedPassword });
  console.log(
    "User created with email:",
    user.email,
    "and hashed password:",
    user.password
  );

  return user;
};
export const findUserByEmail = (email) => {
  return User.findOne({ email });
};

export const updateToken = (userId, token) => {
  return User.findByIdAndUpdate(userId, { token });
};
