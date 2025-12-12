const router = require("express").Router()
const {signupController, loginController, logoutController, meController} = require('../controllers/auth.controller')
const authMiddleWare = require("../middleware/auth.middelware")

router.post("/signup",signupController )
router.post("/login",loginController )
router.post("/logout", logoutController )
router.get("/me", authMiddleWare, meController)


module.exports = router