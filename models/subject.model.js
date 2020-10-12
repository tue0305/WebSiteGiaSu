import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const subjectSchema = new Schema({
  Name: {type: String, required: true, unique: true}, // String is shorthand for {type: String}
  Description: String, // String is shorthand for {type:}
});

scheduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Subject', subjectSchema, 'subjects');
