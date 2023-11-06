import { unsetUserToken } from "#repository/users/usersRepository.js";

export const logout = async (req, res, next) => {
  try {
    await unsetUserToken(req.user._id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
