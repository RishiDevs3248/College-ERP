const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const attendanceModel = new Schema({
    dept: String,
    year: Number,
    subject: String,
    attendance: [{
        type: Number,
    }],
    dateWithYear :{
        type : Number,
    },
    date: {
        type: Number,
    },
    month: {
        type: Number,
    },
    teacherID: {
        type: mongoose.Schema.ObjectId,
        ref: "teachers"
    }
}
);

module.exports = mongoose.model('attendanceModel', attendanceModel); 