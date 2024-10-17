const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const firstYearTimetableModel = new Schema({
  department : String,
  div : String,
  timetable : Buffer,
});

module.exports = mongoose.model('firstYearTimetableModel',firstYearTimetableModel); 