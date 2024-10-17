const createJwtToken = require("../components/createJwtToken");
const studentModel = require("../models/studentModel");
const bcrypt = require('bcrypt');
const timetableModel = require("../models/timetableModel");
const firstYearTimetableModel = require("../models/firstYearTimetableModel");
const noticeModel = require("../models/noticeModel");
const assignmentModel = require("../models/assignmentModel");
const saltRounds = 10;
const QRCode = require('qrcode');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const studentRegister = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { year, dept, div } = req.body; // Remove this after creating update profile 
        const Student = await studentModel.findOne({ email });
        if (Student) {
            return res.json({ "msg": `email (${email}) already in use ` });
        }
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                await studentModel.create({ email, password: hash, year, dept, div })
                res.cookie("token", createJwtToken(email))
                return res.json({ "msg": "new Student Created" });
            });
        });
    } catch (error) {
        console.log("Some error occured during Registering a new Student : ", error)
    }
}


const studentLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const student = await studentModel.findOne({ email })
        if (student) {
            bcrypt.compare(password, student.password, function (err, result) {
                if (result) {
                    res.cookie("token", createJwtToken(email))
                    //redirect to the dashboard ----------------------
                    return res.json({ redirect: "http://localhost:5173/student", "msg": "Logged in successfully" });
                    // return res.json({"msg":"Logged in successfully"})
                }
                else {
                    return res.json({ "error": "Wrong password , please try again" });
                }
            });
        } else {
            return res.json({ "error": "No student with this email" });
        }
    } catch (error) {
        console.log("Some error occured during Logging in Student : ", error)
    }
}


const profile = async (req, res) => {
    try {
        const user = await studentModel.findOne({ email: req.user.email }).select("-password")
        res.send(user);
    } catch (error) {
        console.log("Error occured while fetching profile : ", error)
    }
}

const UpdateProfile = async (req, res) => {
    try {
        const { name, dept, year, div, phoneNo, rollNo } = req.body;
        // console.log(req.file)
        const stu = await studentModel.findOne({ email: req.user.email })
        stu.name = name,
            stu.dept = dept,
            stu.year = year,
            stu.div = div,
            stu.phoneNo = phoneNo,
            stu.rollNo = rollNo
        if (req.file) {
            const profilePhoto2 = req.file.buffer; // Assuming multer saves the file path
            stu.profilePhoto = profilePhoto2
        }
        await stu.save()
        return res.json({ "msg": "Updated Successfully" });
    } catch (error) {
        console.log("Some error Occured during updating the profile : ", error)
    }
}

const UpdateCredentials = async (req, res) => {
    try {
        const { password, confirmpassword } = req.body
        if (password != confirmpassword) {
            return res.json({ "error": "password does not match" })
        }
        const user = await studentModel.findOne({ email: req.user.email })
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                user.password = hash;
                user.save()
                return res.json({ "msg": "password changed successfully" })
            });
        });

    } catch (error) {
        console.log("Some error occured during changing the password")
    }
}

const getTimetable = async (req, res) => {
    try {
        const { dept, year, div } = req.user;
        if (year == "1") {
            const { dept, div } = req.user;
            const timetable = await firstYearTimetableModel.findOne({ department: dept, div })
            if (!timetable) {
                return res.json({ "error": "No timetable present , please notify you GFM" })
            }
            return res.send(timetable);
        } else {
            const timetable = await timetableModel.findOne({ department: dept, year })
            if (!timetable) {
                return res.json({ "error": "No timetable present , please notify you GFM" })
            }
            return res.send(timetable);
        }
    } catch (error) {
        console.log("Error occured while fetching timetable : ", error)
    }
}


// const getFirstYearTimetable = async (req, res) => {
//     try {
//         const { dept, div } = req.user;
//         const timetable = await firstYearTimetableModel.findOne({ department: dept, div })
//         if (!timetable) {
//             return res.send("No timetable present , please notify you GFM")
//         }
//         return res.send(timetable.timetable);
//     } catch (error) {
//         console.log("Error occured while fetching First year timetable : ", error)
//     }
// }


const getNotice = async (req, res) => {
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

const getAssignment = async (req, res) => {
    try {
        const { dept, year, div } = req.user;
        const { subject } = req.body;
        const assignments = await assignmentModel.find({ dept, year, div, subject })
        if (!assignments) {
            return res.json({ "msg": `No Assignments for ${subject} subject` })
        }
        return res.send(assignments)
    } catch (error) {
        console.log("Error occured while fetching Assignments : ", error)
    }
}

const generateQR = async (req, res) => {
    try {
        if (!req.user.rollNo) {
            return res.json({ "error": "Please Update Your Profile" })
        }
        const RollNo = String(req.user.rollNo);
        const qrCode = await QRCode.toDataURL(RollNo);
        res.json({ "qrCode": qrCode });
    } catch (error) {
        console.log("Error occured during generating QR Code", error)
    }
}


module.exports = { studentRegister, studentLogin, profile, UpdateProfile, UpdateCredentials, getTimetable, getNotice, getAssignment, generateQR }