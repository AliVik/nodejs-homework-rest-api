const { findUserByEmail } = require("../../services/users");
const { sendEmail } = require("../../sendgrid/helpers");

const reverifyUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail({ email });
    if (user.verify) {
      res.status(400).json({
        message: "Verification has already been passed",
      });
      return;
    }
    const mail = {
      to: email,
      subject: "Email verification",
      html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
    };
    await sendEmail(mail);
    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = reverifyUser;
