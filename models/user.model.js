import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const userSchema = new Schema({
  Name: String, // String is shorthand for {type: String}
  phoneNumber: Number,
  Email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  Gender: Boolean, // Male is 1 and Female is 0
  //Ngày sinh
  DOB: {
    type: Date,
    default: null
  },
  //Chức vụ
  Role: {
    type: mongoose.Types.ObjectId,
    default: null,
    ref = useRef('Role')
  },
  Password: {
    type: String,
    required: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true
  },
  //Các lớp đã nhận
  Class: [{
    type: mongoose.Types.ObjectId, ref = 'Class'
  }]
});


userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema, 'users');
