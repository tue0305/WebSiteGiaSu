import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;
//Quyền phân loại User ("người dùng", "nhân viên", "admin")
const roleSchema = new Schema({
  Name: String, // String is shorthand for {type: String}
  Description: String
});

roleSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Role', roleSchema, 'roles');
