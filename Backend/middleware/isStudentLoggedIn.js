const studentModel = require('../models/studentModel');
var jwt = require('jsonwebtoken');
const isStudentloggedin = async (req,res,next) => {
    try {
        if(!req.cookies.token){
            // res.redirect('/Login');
            //redirect to login page -----------
            return res.json({"msg":"Not logged in!!"})
        }
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY,async function(err, decoded) {
            // console.log(decoded) //Remove Afterwards
            const user = await studentModel.findOne({email : decoded.email})
            if(!user){
                return res.json({"msg":"Not logged in!!"});
            }
            req.user = user;
            next()
        });
    } catch (error) {
        console.log("Error in isLoggedIn : ",error)
    }
}
module.exports.isStudentloggedin = isStudentloggedin;