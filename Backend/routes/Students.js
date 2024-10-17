const express = require("express");
const studentsRouter = express.Router();
const QRCode = require('qrcode');
const studentModel = require("../models/studentModel");
const createJwtToken = require("../components/createJwtToken");
const bcrypt = require('bcrypt');
const { studentRegister, studentLogin, profile,UpdateProfile, getTimetable, getFirstYearTimetable, getNotice, UpdateCredentials, getAssignment, generateQR } = require("../controllers/studentController");
const saltRounds = 10;
const { isStudentloggedin } = require("../middleware/isStudentLoggedIn")
const logout = require("../components/logout");
const timetableModel = require("../models/timetableModel");
const firstYearTimetableModel = require("../models/firstYearTimetableModel");
const noticeModel = require("../models/noticeModel");
const assignmentModel = require("../models/assignmentModel");
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


studentsRouter.use(express.json());

//default route
// studentsRouter.get("/",isStudentloggedin,(req,res)=>{
//     res.json({"msg":"Hello user"})
// })

// //Sudent register 
// studentsRouter.post("/studentRegister", studentRegister)

//Student Login
studentsRouter.post("/login", studentLogin)

//Student Logout
studentsRouter.post("/logout", logout)

//Student profile
studentsRouter.get("/Profile", isStudentloggedin, profile)

//update profile 
studentsRouter.post("/UpdateProfile", isStudentloggedin ,upload.single('profilePhoto'), UpdateProfile)

//update password 
studentsRouter.post("/UpdateCredentials", isStudentloggedin,UpdateCredentials )

//Get timetable for 1st, 2nd , 3rd & 4th year
studentsRouter.get("/getTimetable", isStudentloggedin, getTimetable)

//timetable update and create for 1st year
// studentsRouter.get("/getFirstYearTimetable", isStudentloggedin, getFirstYearTimetable)

//get Notice
studentsRouter.get("/getNotice", isStudentloggedin, getNotice)

//get Assignment
studentsRouter.post("/getAssignment", isStudentloggedin, getAssignment)

//attendance QR Code generator
studentsRouter.get("/generateQR", isStudentloggedin ,generateQR)







//test route
studentsRouter.get("/test", (req, res) => {
    res.send("students working test")
})

module.exports = studentsRouter