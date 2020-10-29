const express = require('express');
const passport = require('passport');
const flash = require('flash');
const router = express.Router();


const controller = require("../controllers/user.controller");

router.get("/profile", isLoggedIn, controller.profile);

router.get("/logout", isLoggedIn, controller.logout);

router.use("/", notisLoggedIn, controller.index);

router.get("/registration", controller.register);
router.post(
  "/registration",
    passport.authenticate("local.registration", {
    successRedirect: "/user/registration",
    failureRedirect: "/user/registration",
    failureFlash: true,
  })
);


router.get("/login", controller.login);
router.post(
  "/login",
  passport.authenticate("local.login", {
    successRedirect: "/admin",
    failureRedirect: "/user/login",
    failureFlash: true,
  })
);

// Hàm được sử dụng để kiểm tra đã login hay chưa
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

function notisLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
  
