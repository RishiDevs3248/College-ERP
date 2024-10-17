const teacherModel = require('../models/teacherModel');
var jwt = require('jsonwebtoken');
const isloggedin = async (req,res,next) => {
    try {
        if(!req.cookies.token){
            // res.redirect('/Login');
            //redirect to login page -----------
            return res.send("Not logged in!!")
        }
        jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY,async function(err, decoded) {
            // console.log(decoded) 
            const user = await teacherModel.findOne({email : decoded.email})
            if(!user){
                return res.send("Not logged in!!")
            }
            req.user = user;
            next()
        });
    } catch (error) {
        console.log("Error in isLoggedIn : ",error)
    }
}
module.exports.isloggedin = isloggedin;