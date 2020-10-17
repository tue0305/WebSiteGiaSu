const express  = require('express');
const passport = require('passport')

module.exports.index = function (req, res, next) {
  next();
};
// =====================================
// Đăng xuất ==============================
// =====================================
module.exports.logout = function (req, res, next) {
  req.logout();
  req.session.user = null;
  req.flash("succsess_msg", "Bạn đã đăng xuất");
  req.session.destroy(); //xóa
  res.redirect("/");
};

// =====================================
// Thông tin user đăng ký =====================
// =====================================
module.exports.profile = function (req, res) {
  res.render("user/profile");
};
// =====================================
// Đăng ký ==============================
// =====================================
// hiển thị form đăng ký
module.exports.register = function (req, res, next) {
  const messages = req.flash("error");
  res.render("./user/user-registration");
};

// =====================================
// Đăng nhập ===============================
// =====================================
// hiển thị form đăng nhập
module.exports.login = function (req, res, next) {
    const messages = req.flash("error");
    res.render("user/login", {
      messages: messages,
      hasErrors: messages.length > 0,
    });
  }



