const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name : String,
  email : String,
  password : String,
  profilePhoto : Buffer, // pending
  phoneNo : Number,
  dept : String,
  subjects :[{
    type : String
  }],
});

module.exports = mongoose.model('TeacherSchema',TeacherSchema); 