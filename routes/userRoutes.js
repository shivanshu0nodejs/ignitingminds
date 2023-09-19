const express = require("express");

const router = express.Router();

const {home} = require("../controllers/homeController.js");
const {signup, login, otpVerification, loginOtp, resendOtp} = require("../controllers/userController.js");


router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/otpverification").post(otpVerification);
router.route("/loginotp").post(loginOtp);
router.route("/resendotp").post(resendOtp);


module.exports = router;

