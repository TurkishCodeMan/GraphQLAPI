const AuthError = require("../errors/AuthError")

const authControl = resolver => (parent, args, context, info) => {
  try {
    if (context.user) {
      return resolver(parent, args, context)
    } else {
      throw new AuthError("Authentication Unauthorized", 401, 'Unauthorized Please Login !')
    }

  } catch (error) {
    return error;
  }
}
module.exports = {
  authControl
}