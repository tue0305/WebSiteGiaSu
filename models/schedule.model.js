import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';


const { Schema } = mongoose;

const scheduleSchema = new Schema({
  StartDate: Date,
  //Thời khóa biểu, DOW: Ngày trong tuần(VD: Thứ 2, thứ 3)
  timeTable: [{
    DOW: {
      Name: String,
      isMorning: Boolean,
      isAfternoon: Boolean,
      isEvening: Boolean,
    },
  }],
  
  

  
});

scheduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Schedule', scheduleSchema, 'schedules');
