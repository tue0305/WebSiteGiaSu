const { datepickerStyle } = require('admin-bro');
const mongoose = require('mongoose')
const uniqueValidator  =  require('mongoose-unique-validator');
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;
var dateFormat = require('date-format');
const GENDER = ["Male", "Female"];
const ROLE = ["ADMIN", "STAFF", "CLIENT"];
const userSchema = new Schema({
  Name: String, // String is shorthand for {type: String}
  phoneNumber: Number,
  Email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  Avatar: String,
  
  Gender: {
    type: String,
    enum: GENDER,
    default: null,
  },  // GIỚI TÍNH
  //Ngày sinh
  DOB: {
    type: Date,
    default: null,
    min: '1950-09-28',
     
  },
  //Chức vụ
  Role: {
    type: String,
    enum: ROLE,
    default: ROLE.STAFF,
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  //Các lớp đã nhận
  Class: [{
    type: mongoose.Types.ObjectId,
    ref: 'Class'
  }],

  //trạng thái hoạt động
  Active: Boolean,
});

// mã hóa trước khi lưu mật khẩu
userSchema.pre('save', async function (next) {
  try {
    // tạo salt
    const salt = await bcrypt.genSalt(10)
    //tạo password hash (password + hash)
    const password_hash = await bcrypt.hash(this.Password, salt)
    //gán lại giá trị đã hash cho password
    this.Password = password_hash
  } catch (error) {
    next(error)
  }
});


userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.Password);
};

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema, 'users');
