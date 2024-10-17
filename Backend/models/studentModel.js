const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentModel = new Schema({
  name : String,
  email : String,
  password : String,
  profilePhoto : Buffer, // pending
  phoneNo : Number,
  dept : String,
  year : String,
  div : String,
  rollNo : Number,
});

module.exports = mongoose.model('studentModel',studentModel); 