const express = require("express");
const router = express.Router();

const {home} = require("../controllers/homeController.js");
const {signup, login, signupOtp, loginOtp, resendOtp} = require("../controllers/userController.js");
const {addBlog, newImg} = require("../controllers/blogController.js");


router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/signupotp").post(signupOtp);
router.route("/loginotp").post(loginOtp);
router.route("/resendotp").post(resendOtp);
router.route("/addblog").post(addBlog);


module.exports = router;
