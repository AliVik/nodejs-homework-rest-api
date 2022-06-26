const { User } = require("../models");

const findUserByEmail = async ({ email }) => {
  return await User.findOne({ email });
};

const createUser = async (email, password, avatarURL) => {
  return await User.create({ email, password, avatarURL });
};

const findUserById = async (id) => {
  return await User.findById(id);
};

const findUserAndUpdate = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  findUserAndUpdate,
};
