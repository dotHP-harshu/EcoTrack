const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { sendError, sendSuccess } = require("../utils/resFormatter");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  const { email, password, name } = req.body;

  if ((!email || !password, !name)) {
    return sendError(
      res,
      false,
      400,
      "Name, email and password are required.",
      {}
    );
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      return sendError(
        res,
        false,
        400,
        "User Already Exist You can login.",
        {}
      );
    }

    const passHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: passHash, name });
    const safeUser =  {_id:user._id, email:user.email, name:user.name}
    return sendSuccess(res, true, 202, "User Created successfully.", {
      user: safeUser,
    });
  } catch (error) {
    return sendError(res, false, 400, "Catched error on creating user ", error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return sendError(res, false, 404, "Password or email is incorrect.", {});

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return sendError(res, false, 400, "Password or email is incorrect.");

    const safeUser = {_id:user._id, email:user.email, name:user.name}

    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.cookie("token", token);

    //    res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    return sendSuccess(res, true, 200, "User is logged-in.", {user:safeUser});
  } catch (error) {
    return sendError(res, false, 500, "Error logging in.", error);
  }
};

const meController = async (req, res) => {
  const user = req.user;
  const safeUser = { _id: user._id, name: user.name, email: user.email };
  return sendSuccess(res, true, 200, "Current user.", { user: safeUser });
};

const logoutController = async (req, res) => {
  res.clearCookie("token");
  //res.clearCookie("token", {
  //   httpOnly: true,
  //   sameSite: "lax",
  //   secure: process.env.NODE_ENV === "production",
  // });

  return sendSuccess(res, true, 200, "Logged out.", {});
};

module.exports = { signupController, loginController, logoutController, meController };
