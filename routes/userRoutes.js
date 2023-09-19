const express = require("express");

const router = express.Router();

const {home} = require("../controllers/homeController.js");
const {signup, login, otpVerification} = require("../controllers/userController.js");


router.route("/").get(home);
router.route("/signup").post(signup);
router.route("/login").get(login);
router.route("/otpverification").post(otpVerification);

module.exports = router;
