import User from "#models/user.js";

import { ErrorHandler } from "#middlewares/errorHandler.js";

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new ErrorHandler(401, { message: "Not authorized" });
    }

    const freshUser = await User.findById(user._id);

    res.json({
      email: user.email,
      subscription: freshUser.subscription,
      avatarURL: freshUser.avatarURL,
    });
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

export { getCurrentUser };
