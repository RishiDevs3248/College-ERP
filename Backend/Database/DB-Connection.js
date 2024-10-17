const mongoose = require('mongoose');
require('dotenv').config()
const connection = async ()=>{
  try {
    mongoose.connect(process.env.database_Connection_link)
      .then(() => console.log('Connected to Database!'));
  } catch (error) {
    console.log("Database Connection Error : ",error)
  }
}

module.exports = connection
