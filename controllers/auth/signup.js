const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { findUserByEmail, createUser } = require("../../services/users");
const { hashPassword } = require("../../middlewares/passwordHash");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
    const hashedPassword = hashPassword(password);

    if (user) {
      throw new Conflict(`Email in use`);
    }
    const avatarURL = gravatar.url(email);
    await createUser(email, hashedPassword, avatarURL);
    res.status(201).json({
      user: {
        email,
        avatarURL,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
