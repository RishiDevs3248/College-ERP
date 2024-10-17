const createJwtToken = require('../components/createJwtToken');
const teacherModel = require('../models/teacherModel');
const timetableModel = require('../models/timetableModel');
const noticeModel = require("../models/noticeModel");
const bcrypt = require('bcrypt');
const firstYearTimetableModel = require('../models/firstYearTimetableModel');
const attendanceModel = require('../models/attendanceModel');
const assignmentModel = require('../models/assignmentModel');
const studentModel = require('../models/studentModel');
const saltRounds = 10;
const nodemailer = require("nodemailer");

const newTeacher = async (req, res) => {
    try {
        const { email } = req.body;
        const password = process.env.DEFAULT_PASSWORD;
        const teacher = await teacherModel.findOne({ email });
        if (teacher) {
            return res.json({ "error": `email (${email}) already in use ` });
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const teacher = await teacherModel.create({
                    email,
                    password: hash,
                })
                // res.cookie("token", createJwtToken(email))
                return res.json({ "msg": "new Teacher Created" });
            });
        });
    } catch (error) {
        console.log("Error in creating a new teacher controller : ", error)
    }
}

const studentRegister = async (req, res) => {
    try {
        const { email } = req.body;
        const password = process.env.DEFAULT_PASSWORD;
        const Student = await studentModel.findOne({ email });
        if (Student) {
            return res.json({ "error": `email (${email}) already in use ` });
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                await studentModel.create({ email, password: hash })
                // res.cookie("token", createJwtToken(email))
                return res.json({ "msg": "new Student Created" });
            });
        });
    } catch (error) {
        console.log("Some error occured during Registering a new Student : ", error)
    }
}

const teacherLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const teacher = await teacherModel.findOne({ email: email })
        if (teacher) {
            bcrypt.compare(password, teacher.password, function (err, result) {
                if (result) {
                    res.cookie("token", createJwtToken(email))
                    return res.json({ redirect: "http://localhost:5173/teacher" })
                    //redirect to the dashboard ----------------------
                }
                return res.json({ "error": "Wrong password , please try again" });
            });

        } else {
            return res.json({ "error": "Someting went wrong" })
        }
    } catch (error) {
        console.log("Error in teacher login controller :", error)
    }
}

const teacherProfile = async (req, res) => {
    try {
        const user = await teacherModel.findOne({ email: req.user.email }).select("-password")
        res.send(user);
    } catch (error) {
        console.log("Error occured while fetching profile : ", error)
    }
}


const updateTimetable = async (req, res) => {
    try {
        const { department, year } = req.body;
        const isTimetable = await timetableModel.findOne({ department: department, year: year })
        if (isTimetable) {
            //change timetable to image from string
            if (req.file) {
                const timetable = req.file.buffer; // Assuming multer saves the file path
                isTimetable.timetable = timetable;
            }
            await isTimetable.save()
            return res.json({ "msg": "Timetable updated Successfully" })
        } else {
            //change timetable to image from string 
            const timetable = req.file.buffer;
            const newTimetable = await timetableModel.create({ department: department, year: year, timetable: timetable })
            // console.log(newTimetable.timetable);
            return res.json({ "msg": "Timetable created Successfully" })
        }

    } catch (error) {
        console.log("Some error occured during creating or updating timetable : ", error)
    }
}


const newNotice = async (req, res) => {
    try {
        const { subject } = req.body;
        const newNotice = await noticeModel.create({ subject });

        if (req.file) {
            const NoticeBuffer = req.file.buffer; // Assuming multer saves the file path
            newNotice.notice = NoticeBuffer;
            await newNotice.save();
        }

        // Fetch all students' emails
        const students = await studentModel.find(); // Adjust as necessary
        const studentEmails = students.map(student => student.email); // Assuming 'email' is the field name

        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_EMAIL_PASSWORD, // Use app password if 2FA is enabled
            },
        });

        // Set up email options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            bcc: studentEmails, // Use BCC to send to all students
            subject: "New Notice",
            text: "You have a new notice! Check the Notice Section on your ERP site",
        };

        // Send email
        await transporter.sendMail(mailOptions);
        console.log("Emails sent successfully!");

        return res.json({ "msg": "Notice uploaded successfully" });
    } catch (error) {
        console.error("Error occurred during uploading a new notice: ", error);
        return res.status(500).json({ "error": "Failed to upload notice and send emails" });
    }
};

const GetNotice = async (req, res) => {
    try {
        const Notice = await noticeModel.find({})
        if (!Notice) {
            return res.json({ "msg": "No notice present" })
        }
        return res.send(Notice)
    } catch (error) {
        console.log("Error occured while fetching All Notice : ", error)
    }
}

const deleteNotice = async (req, res) => {
    try {
        const { id } = req.body;
        const notice = await noticeModel.findOneAndDelete({ _id: id })
        if (!notice) {
            return res.json({ "error": `No Notice present with ID : ${id}` })
        }
        return res.json({ "msg": "Notice deleted successfully" })
    } catch (error) {
        console.log("error occured during deleting a new notice : ", error)
    }
}

const deleteAllNotice = async (req, res) => {
    try {
        await noticeModel.deleteMany({})
        return res.json({ "msg": "All notice deleted successfully" })
    } catch (error) {
        console.log("error occured during deleting all notice : ", error)
    }
}


const DailyAnnouncement = async (req, res) => {
    try {
        const { dept, year, div, subject } = req.body;


        // Fetch all students' emails
        const students = await studentModel.find({ dept, year, div }); // Adjust as necessary
        // if (!students) {
        //     return res.json({ "error": "No Students present for current Data, Failed to send emails" });
        // }
        const studentEmails = students.map(student => student.email); // Assuming 'email' is the field name
        // console.log("Student Emails:", studentEmails);
        // Set up the email transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587, // or 465 for SSL
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_EMAIL_PASSWORD, // Use app password if 2FA is enabled
            },
        });

        // Set up email options
        const mailOptions = {
            from: process.env.AUTH_EMAIL,
            bcc: studentEmails, // Use BCC to send to all students
            subject: "New Notice",
            text: `You have a new announcement!
                 ${subject}`,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        // console.log("info", info);
        console.log("Announcement Emails sent successfully!");

        return res.json({ "msg": "Announcement sent successfully" });
    } catch (error) {
        console.error("Error occurred during sending announcement : ", error);
        return res.status(500).json({ "error": "Failed to send emails , please check your inserted data" });
    }
};

const updateOrCreateFirstYearTimetable = async (req, res) => {
    try {
        const { department, div } = req.body;
        const isTimetable = await firstYearTimetableModel.findOne({ department: department, div: div })
        if (isTimetable) {
            //change timetable to image from string
            if (req.file) {
                const timetable = req.file.buffer; // Assuming multer saves the file path
                isTimetable.timetable = timetable;
            }
            await isTimetable.save()
            // console.log(updateTimetable.timetable);
            return res.json({ "msg": "Timetable updated Successfully" })
        } else {
            //change timetable to image from string 
            const timetable = req.file.buffer;
            const newTimetable = await firstYearTimetableModel.create({ department: department, div: div, timetable: timetable })
            // console.log(newTimetable.timetable);
            return res.json({ "msg": "Timetable created Successfully" })
        }
    } catch (error) {
        console.log("Some error occured during creating or updating first year timetable : ", error)
    }
}

const GetTimetable = async (req, res) => {
    try {
        const { dept, year } = req.body;
        if (year == "1") {
            const { dept, div } = req.body;
            const timetable = await firstYearTimetableModel.findOne({ department: dept, div })
            if (!timetable) {
                return res.json({ "msg": "No timetable present , please notify you GFM" })
            }
            return res.send(timetable);
        }
        const timetable = await timetableModel.findOne({ department: dept, year })
        if (!timetable) {
            return res.json({ "msg": "No timetable present , please notify you GFM" })
        }
        return res.send(timetable);
    } catch (error) {
        console.log("Error occured while fetching timetable : ", error)
    }
}

const deleteFirstYearTimetable = async (req, res) => {
    try {
        const { div } = req.body;
        const classTimetable = await firstYearTimetableModel.findOneAndDelete({ div: div })
        if (!classTimetable) {
            return res.json({ "error": `no timetable present of Div ${div}` })
        }
        return res.json({ "msg": "Timetable deleted sccessfully" })
    } catch (error) {
        console.log("Some error occured during deleting first year timetable : ", error)
    }
}

const markAttendance = async (req, res) => {
    try {
        const { studentIds, year, subject } = req.body;
        const { dept, _id } = req.user

        if (!studentIds || studentIds.length === 0) {
            return res.status(400).json({ "error": "No students scanned." });
        }

        const today = new Date();
        const dateWithYear = today.getFullYear();
        const dayOfMonth = today.getDate();
        const currentMonth = new Date().getMonth() + 1;

        let attendanceRecord = await attendanceModel.findOne({ dept, year, subject, dateWithYear, date: dayOfMonth, teacherID: _id });

        if (!attendanceRecord) {
            attendanceRecord = new attendanceModel({
                dept,
                year,
                subject,
                date: dayOfMonth,
                month: currentMonth,
                teacherID: _id,
                studentIds,
                dateWithYear
            });
        }

        studentIds.forEach(studentId => {
            if (!attendanceRecord.attendance.includes(studentId)) {
                attendanceRecord.attendance.push(studentId);
            }
        });

        await attendanceRecord.save();

        return res.json({ "msg": "Attendance marked successfully.", attendanceRecord });
    } catch (error) {
        console.error("Error marking attendance:", error);
        res.status(500).json({ "msg": "Internal server error." });
    }
}

const getAttendance = async (req, res) => {
    try {
        const { dept, year, subject, dateWithYear, date, month } = req.body;
        const response = await attendanceModel.findOne({ dept, year, subject, dateWithYear, date, month })
        if (!response) {
            return res.json({ "error": "No attendence Marked for this date and year" });

        }
        res.send(response.attendance);
    } catch (error) {
        console.error("Error while getting attendance : ", error);
    }
}

const CreateOrUpdateAssignment = async (req, res) => {
    try {
        const { year, div, subject, assignmentNo, submitDate } = req.body;
        const assignment = req.file.buffer;
        const { dept } = req.user
        const Assignment = await assignmentModel.findOne({ dept, year, div, subject, assignmentNo })
        if (!Assignment) {
            const newAssignment = await assignmentModel.create({ dept, year, div, subject, assignmentNo, assignment, submitDate })
            return res.json({ "msg": "New assignment uploaded successfully", assignment: newAssignment })
        }
        Assignment.assignment = assignment;
        Assignment.submitDate = submitDate;
        Assignment.save()
        return res.json({ "msg": "Assignment Updated Succesfully", assignment: Assignment })
    } catch (error) {
        console.error("Error in creating a new Assignment : ", error);
    }
}

const GetAssignment = async (req, res) => {
    try {
        const { dept, year, div, subject } = req.body;
        const assignments = await assignmentModel.find({ dept, year, div, subject })
        if (!assignments) {
            return res.json({ "error": `No Assignments for ${subject} subject` });
        }
        return res.send(assignments)
    } catch (error) {
        console.log("Error occured while fetching Assignments : ", error)
    }
}

const deleteParticularAssignment = async (req, res) => {
    try {
        const { year, subject, assignmentNo } = req.body;
        const { dept } = req.user
        const Assignment = await assignmentModel.findOneAndDelete({ dept, year, subject, assignmentNo })
        if (!Assignment) {
            return res.json({ "error": `No assignment present for department ${dept} , year ${year} , subject ${subject} , assignment No. ${assignmentNo}` });
        }
        return res.json({ "msg": "Assignment Deleted Succesfully" });
    } catch (error) {
        console.error("Error in Deleting a perticular Assignment : ", error);
    }
}

const deleteAllAssignmentForASubject = async (req, res) => {
    try {
        const { year, subject } = req.body;
        const { dept } = req.user
        const ifAssignment = await assignmentModel.findOne({ dept, year, subject })
        if (!ifAssignment) {
            return res.json({ "error": `No assignments present for department ${dept} , year ${year} , subject ${subject}` });
        }
        await assignmentModel.deleteMany({ dept, year, subject })
        return res.json({ "msg": `All Assignments Deleted Succesfully for subject ${subject}` });
    } catch (error) {
        console.error("Error in Deleting a perticular Assignment : ", error);
    }
}

const UpdateProfile = async (req, res) => {
    try {
        const { name, dept, phoneNo } = req.body;
        const user = await teacherModel.findOne({ email: req.user.email })
        user.name = name;
        user.dept = dept;
        user.phoneNo = phoneNo;
        if (req.file) {
            const profilePhoto2 = req.file.buffer; // Assuming multer saves the file path
            user.profilePhoto = profilePhoto2
        }
        await user.save();
        res.json({ "msg": "Profile Updated Successfully" })
    } catch (error) {
        console.log("Some Error Occured During Updatin profile : ", error)
    }
}

const UpdateCredentials = async (req, res) => {
    try {
        const { password, confirmpassword } = req.body
        if (password != confirmpassword) {
            return res.json({ "error": "password does not match" })
        }
        const user = await teacherModel.findOne({ email: req.user.email })
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                user.password = hash;
                user.save()
                return res.json({ "msg": "password changed successfully" })
            });
        });

    } catch (error) {
        console.log("Some error occured during changing the password : ", error)
    }
}

module.exports = { newTeacher, teacherLogin, teacherProfile, updateTimetable, newNotice, deleteNotice, deleteAllNotice, updateOrCreateFirstYearTimetable, deleteFirstYearTimetable, markAttendance, CreateOrUpdateAssignment, deleteParticularAssignment, deleteAllAssignmentForASubject, UpdateProfile, UpdateCredentials, getAttendance, GetAssignment, GetNotice, GetTimetable, studentRegister, DailyAnnouncement }