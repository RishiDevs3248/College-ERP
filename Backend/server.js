const connection = require("./Database/DB-Connection")
const cookieparser = require("cookie-parser")
const router = require("./routes/teachers") 
const studentsRouter = require("./routes/Students");
var cors = require('cors')

const express = require ("express");
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    secure : false,
  credentials: true,
}))
app.use(express.json());
app.use(cookieparser())


//to teacher route
app.use('/teacher',router)

//to Student route 
app.use('/student',studentsRouter) 


app.listen(3000,connection())