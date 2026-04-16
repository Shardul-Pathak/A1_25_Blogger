const userModel = require('../model/user-model')
const jwt = require('jsonwebtoken');

const verifyToken = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    return res.status(200).json({ message: "Token is valid" });
};

let logout = (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });
        res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Logout failed", error: err });
    }
};

let getUserDetail = async(req,res)=>{
    try{
        let data = await userModel.getUserData();
        res.send(data)
        
    }catch(err){
        res.send(err);
    }
}

let addUserDetail = async(req,res)=>{
    try{
        let userData = req.body;
        let data = await userModel.addUser(userData);
        res.send(data)
        
    }catch(err){
        res.send(err);
    }
}


let  userLogin= async (req, res)=> {
  
    let userData = req.body;
   
   try{
    let data = await userModel.loginUserdata(userData);
    if (data.success && data.token) {
        // Set token as secure cookie
        res.cookie('token', data.token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
            sameSite: 'lax',
            maxAge: 3600000 // 1 hour
        });
        res.json({ success: true, message: data.message, user: data.user });
    } else {
        res.status(401).json(data);
    }

   }catch (err){
    res.send(err);
    console.log(err)
   }
  }

  module.exports = {getUserDetail, userLogin, addUserDetail, verifyToken, logout};