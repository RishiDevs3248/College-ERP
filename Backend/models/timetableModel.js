const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const timetableModel = new Schema({
  department : String,
  year : String,
  timetable : Buffer,//change it Buffer
});

module.exports = mongoose.model('timetableModel',timetableModel); 