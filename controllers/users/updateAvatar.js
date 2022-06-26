const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
const { findUserAndUpdate } = require("../../services/users");

const avatarsDir = path.join(__dirname, "../../", "public");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const avatarURL = path.join("avatars", `${id}${path.extname(originalname)}`);

  try {
    await Jimp.read(tempUpload)
      .then((img) => {
        return img.resize(250, 250).write(path.join(avatarsDir, avatarURL));
      })
      .catch((err) => {
        console.error(err);
      });

    await findUserAndUpdate(id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await fs.unlink(tempUpload);
  }
};

module.exports = updateAvatar;
