const {Router} = require('express');
const authController = require('../controllers/auth.controller');
const {isAlreadyReg} = require('../middlewares/isAlreadyReg.middleware');

const authRouter = Router();

//Register Api create
authRouter.post("/register",authController.regUser);

//login api create
authRouter.post("/login",authController.loginUser);


//Forgot api create
authRouter.post("/forgot-password",authController.forgotPassword);

//Forgot api create
authRouter.post("/reset-password/:resetToken",authController.resetPassword);

//logout api create
authRouter.get("/logout",isAlreadyReg,authController.logoutUser);

//Fetch Get-Me data api create
authRouter.get("/get-me",isAlreadyReg,authController.getMe);

//google login route api create
authRouter.post("/google",authController.googleLogin);


module.exports = authRouter;