const express = require("express");

const router = express.Router();

const {home} = require("../controllers/homeController.js");
const {signup, login, signupOtp, loginOtp, resendOtp} = require("../controllers/userController.js");


router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/signupotp").post(signupOtp);
router.route("/loginotp").post(loginOtp);
router.route("/resendotp").post(resendOtp);


module.exports = router;
