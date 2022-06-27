const {
  Contact,
  joiContactSchema,
  favoriteStatusSchema,
} = require("./contact");

const { User, joiUserSchema, joiVerifyUserSchema } = require("./user");

module.exports = {
  Contact,
  User,
  joiContactSchema,
  favoriteStatusSchema,
  joiUserSchema,
  joiVerifyUserSchema,
};
