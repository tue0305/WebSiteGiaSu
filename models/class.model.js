const mongoose = require('mongoose')
const uniqueValidator  =  require('mongoose-unique-validator');

const { Schema } = mongoose;
require('mongoose-currency').loadType(mongoose);
const Subject = require('./subject.model')
//*************************** Enum *******************/
const DAY = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", 'SATURDAY']
const STATUS = ["DONE", "IN_PROCESS", "CANCELED"]
const TIME_EACH_SESSION= ["1", "1.5", "2", "2.5", "3", "3.5"]
const classSchema = new Schema({
  //Địa điểm
  Location: {
    provinceName: String,
    Address: String,
  },
  //thời khóa biểu
  Timetable: [{
    Day: {
      type: String,
      enum: DAY,
    },
    isMorning: Boolean,
    isAfternoon: Boolean,
    isNight: Boolean,
  }],
  //Môn học giảng dạy
  Subject: {
    type: Schema.Types.ObjectId,
    ref: 'Subject',
  },
  Description: String,

  //Thông tin gia sư nhận lớp
  User: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    phoneNumber: String,
  },
  //thời gian dạy 1 buổi, tính theo giờ
  timeEachSession: {
    type: String,
    enum: TIME_EACH_SESSION,
  },
  feeEachSession: Number,

  //trạng thái lớp :["Đang dạy", "Đã hoàn thành", "Đã hủy"  ]
  Status: {
    type: String,
    enum: STATUS,
    default: STATUS.IN_PROCESS,
  },
});
classSchema.methods.get_SubjectName = function (data) {
  Subject.findById(data, (err, subject) => {
    if(err) {return res.json({err})}
    return subject
  })
  .then((subject) => {
    return subject
  })
  
}
classSchema.pre('save', async function (next) {
  try {
    
  } catch (error) {
    next(error)
  }
});

// classSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Class', classSchema, 'classes');
