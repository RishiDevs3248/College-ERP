const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const noteiceModel = new Schema({
    subject: String,
    notice: Buffer,//change it Buffer(image)
});

module.exports = mongoose.model('noteiceModel', noteiceModel); 