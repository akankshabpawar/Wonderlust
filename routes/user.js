const express = require("express");
const router = express.Router();
const User = require("../modles/user");
const passport = require("passport");
const { saveRedirectUrl }= require("../middleware");
const userController = require("../controllers/user");

//signup
router.get("/signup", userController.renderSignupForm);

router.post("/signup", userController.createNewUser);

//login
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
}), userController.toLogin);

//logout
router.get("/logout", userController.logout);

module.exports = router;