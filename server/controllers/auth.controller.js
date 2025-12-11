const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { sendError, sendSuccess } = require("../utils/resFormatter");
const jwt  = require("jsonwebtoken")

const signupController = async (req, res) => {
  const { email, password, name } = req.body;

  if ((!email || !password, !name)) return;

  try {
    const user = await userModel.findOne({ email });
    if (user)
      return sendError(
        res,
        false,
        400,
        "User Already Exist You can login.",
        {}
      );

    const passHash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: passHash, name });
    sendSuccess(res, true, 202, "User Created successfully.", {user:newUser});
  } catch (error) {
    sendError(res, false, 400, "Catched error on creating user ", error)
  }
};

const loginController = async(req, res)=>{
    const {email , password} = req.body
    console.log(req.body)

    if ((!email || !password)) return;

    try {
      const user = await userModel.findOne({email});
      if(!user ) 
        return sendError(
          res,
          false,
          404,
          "Password or email is incorrect.",
          {}
        );

      const match = await bcrypt.compare(password, user.password);
      if(!match)
        return sendError(res, false, 400, "Password or email is incorrect.")

      const token = jwt.sign(user.email,process.env.JWT_SECRET)
      res.cookie("token", token)
      sendSuccess(res, true, 200, "User is logged-in.", user)
    } catch (error) {
      
    }
}


module.exports = {signupController, loginController}