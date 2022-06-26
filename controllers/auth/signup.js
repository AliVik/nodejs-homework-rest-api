const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { findUserByEmail, createUser } = require("../../services/users");
const { hashPassword } = require("../../middlewares/passwordHash");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../sendgrid/helpers");

const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
    console.log(user);
    const hashedPassword = hashPassword(password);

    if (user) {
      throw new Conflict(`Email in use`);
    }
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();
    await createUser(email, hashedPassword, avatarURL, verificationToken);
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Click here to verify your email</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      user: {
        email,
        avatarURL,
        subscription: "starter",
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = signup;
