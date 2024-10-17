const express = require ("express");
const router = express.Router();
const { newTeacher, teacherLogin, teacherProfile, updateTimetable, newNotice, deleteNotice, deleteAllNotice, updateOrCreateFirstYearTimetable, deleteFirstYearTimetable, markAttendance, CreateOrUpdateAssignment, deleteParticularAssignment, deleteAllAssignmentForASubject ,UpdateProfile,UpdateCredentials, getAttendance, GetAssignment, GetNotice, GetTimetable, studentRegister, DailyAnnouncement} = require("../controllers/teachers");
const { isloggedin } = require("../middleware/isTeacherLoggedin");
const teacherModel = require("../models/teacherModel");
const timetableModel = require("../models/timetableModel");
const logout = require("../components/logout");
const noticeModel = require("../models/noticeModel");
const firstYearTimetableModel = require("../models/firstYearTimetableModel");
const attendanceModel = require("../models/attendanceModel");
const assignmentModel = require("../models/assignmentModel");
const saltRounds = 10;
const bcrypt = require('bcrypt');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


router.use(express.json());


//new teacher
router.post("/new",newTeacher)

//nwe student
router.post("/RegisterStudent",studentRegister)

//teacher login
router.post("/Login",teacherLogin)

//teacher logout
router.post("/Logout",logout)

//teacher profile
router.get("/Profile",isloggedin,teacherProfile)

//update profile
router.post("/UpdateProfile",isloggedin,upload.single('profilePhoto'),UpdateProfile)

//Update Credentials
router.post("/UpdateCredentials",isloggedin,UpdateCredentials)

//timetable update and create for 2nd , 3rd & 4th year
router.post("/updateTimetable",isloggedin,upload.single('timetable'),updateTimetable)

//timetable update and create for 1st year
router.post("/updateOrCreateFirstYearTimetable",isloggedin,upload.single('timetable'),updateOrCreateFirstYearTimetable)

//Get timetable
router.post("/GetTimetable",isloggedin,GetTimetable)

//timetable delete for 1st year perticular division
router.post("/deleteFirstYearTimetable",isloggedin,deleteFirstYearTimetable)

//post new notice
router.post("/newNotice",isloggedin,upload.single('notice'),newNotice)

//Get Notice
router.get("/GetNotice",isloggedin,GetNotice)

//delete a particular posted notice
router.post("/deleteNotice",isloggedin,deleteNotice)

//delete all notice 
router.post("/deleteAllNotice",isloggedin,deleteAllNotice)

//Set attendance 
router.post("/markAttendance",isloggedin,markAttendance)

//Get Attendance
router.post("/getAttendance",isloggedin,getAttendance)

//post new Assignment
router.post("/newAssignment",isloggedin,upload.single('assignment'),CreateOrUpdateAssignment)

//Get Assignment
router.post("/GetAssignment",isloggedin,GetAssignment)

//delete a particular posted Assignment
router.post("/deleteAssignment",isloggedin,deleteParticularAssignment)

//delete all Assignment for perticular subject
router.post("/deleteAllAssignment",isloggedin,deleteAllAssignmentForASubject)

//Post Daily Announcement
router.post("/DailyAnnouncement",isloggedin,DailyAnnouncement)


//test route
router.get("/test",isloggedin,(req,res)=>{
    res.send("woeking test")
})

module.exports = router