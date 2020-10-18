const { datepickerStyle } = require('admin-bro');
const mongoose = require('mongoose')
const uniqueValidator  =  require('mongoose-unique-validator');

const { Schema } = mongoose;
const GENDER = ["Male", "Female"];
const userSchema = new Schema({
  Name: String, // String is shorthand for {type: String}
  phoneNumber: Number,
  Email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  Avartar: String,
  
  Gender: {
    type: String,
    enum: GENDER,
},  // GIỚI TÍNH
  //Ngày sinh
  DOB: {
    type: Date,
    default: null,
    min: '1950-09-28',
    max: Date.now(),
     
  },
  //Chức vụ
  Role: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref: 'Role'
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


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema, 'users');
