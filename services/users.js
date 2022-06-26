const { User } = require("../models");

const findUserByEmail = async ({ email }) => {
  return await User.findOne({ email }).exec();
};

const createUser = async (email, password, avatarURL, verificationToken) => {
  return await User.create({ email, password, avatarURL, verificationToken });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserAndUpdate = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

const findUserByVerificationToken = async ({ verificationToken }) => {
  return await User.findOne({ verificationToken }).exec();
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  findUserAndUpdate,
  findUserByVerificationToken,
};
