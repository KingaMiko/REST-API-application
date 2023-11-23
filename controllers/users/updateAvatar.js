import fs from "fs/promises";
import jimp from "jimp";

import { updateUserAvatar } from "#repository/users/usersRepository.js";

import { ErrorHandler } from "#middlewares/errorHandler.js";

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new ErrorHandler(400, "No file uploaded");
    }

    const { filename, path: tempPath } = req.file;
    const newPath = `public/avatars/${filename}`;

    const image = await jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(tempPath);

    await fs.rename(tempPath, newPath);

    const avatarURL = `/avatars/${filename}`;
    await updateUserAvatar(req.user._id, avatarURL);

    res.json({ avatarURL });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }

    next(error);
  }
};
