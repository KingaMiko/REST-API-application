import subscriptionSchema from "#validators/subscriptionSchema.js";
import User from "#models/user.js";

export const updateSubscription = async (req, res, next) => {
  try {
    const { error, value } = subscriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { subscription } = value;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { subscription },
      { new: true }
    );

    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    next(error);
  }
};
