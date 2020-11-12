const mongoose = require('mongoose')
// const uniqueValidator  =  require('mongoose-unique-validator');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  Name: {
    type: String,
    required: true
  }, // String is shorthand for {type: String}
  Description: String, // String is shorthand for {type:}
});


// subjectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Subject', subjectSchema, 'subjects');

