import mongoose from "mongoose";
//import uniqueValidator from 'mongoose-unique-validator';
require('mongoose-currency').loadType(mongoose);
const { Schema } = mongoose;

const classSchema = new Schema({
  //Địa điểm
  Location: {
    provinceId: Number,
    provinceName: string,
    Address: String,
  },
  //thời khóa biểu
  Schedule: [{
    type: mongoose.Types.ObjectId,
    ref = 'Schedule'
  }],
  //Môn học giảng dạy
  Subject: {
    type: mongoose.Types.ObjectId,
    ref = 'Subject',
  },
  Description: String,

  //Thông tin gia sư nhận lớp
  User: {
    userId = {
      type: mongoose.Types.ObjectId,
      ref = 'User'
    },
    phoneNumber: Number,
  },
  //thời gian dạy 1 buổi, tính theo giờ
  timeEachSession: Number,
  feeEachSession: mongoose.Types.Currency,

  //trạng thái lớp :["Đang dạy", "Đã hoàn thành", "Đã hủy"  ]
  Status: String,
});

classSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Class', classSchema, 'classes');
