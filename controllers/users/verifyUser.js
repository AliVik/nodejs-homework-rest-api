const {
  findUserByVerificationToken,
  findUserAndUpdate,
} = require("../../services/users");

const verifyUser = async (req, res, next) => {
  const { verificationToken } = req.params;
  console.log("verificationToken", verificationToken);
  const user = await findUserByVerificationToken({ verificationToken });

  if (!user) {
    res.status(404).json({
      message: "User not found",
    });
  }
  try {
    await findUserAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({
      status: "ok",
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyUser;
