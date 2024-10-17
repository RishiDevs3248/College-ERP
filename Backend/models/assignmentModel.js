const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const assignmentModel = new Schema({
    dept : String,
    year : Number,
    div : String,
    subject: String,
    assignmentNo : Number,
    assignment : Buffer,//change it Buffer(image)
    submitDate : String,
});

module.exports = mongoose.model('assignmentModel', assignmentModel); 