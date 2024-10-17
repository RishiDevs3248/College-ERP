module.exports = function Logout(req,res){
    try {
        res.cookie("token", "")
        return res.json({ redirect: "http://localhost:5173" ,"msg":"Logout successful"});
        // res.redirect('/Login');
    } catch (error) {
        console.log("error occured during logging out user : " , error)
    }
}