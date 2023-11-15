import subscriptionSchema from "#validators/subscriptionSchema.js";
import User from "#models/user.js";
import { ErrorHandler } from "#middlewares/errorHandler.js";

export const updateSubscription = async (req, res, next) => {
  try {
    const { error, value } = subscriptionSchema.validate(req.body);
    if (error) {
      throw new ErrorHandler(400, error.details[0].message);
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
