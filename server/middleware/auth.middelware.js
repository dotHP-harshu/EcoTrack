const jwt = require("jsonwebtoken");
const { sendError } = require("../utils/resFormatter");
const userModel = require("../models/user.model");

const authMiddleWare = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return sendError(res, false, 401, "Token not found.", {});
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload) {
      const user = await userModel.findById(payload.id);
      if (!user) {
        return sendError(res, false, 401, "User not found.", {});
      }

      req.user = user;
      next();
    }
  } catch (error) {
    return sendError(res, false, 400, "Catched error on authenctication.", {});
  }
};


module.exports = authMiddleWare