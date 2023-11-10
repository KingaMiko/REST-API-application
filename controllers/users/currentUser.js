import User from "#models/user.js";

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
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
