const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const Auth_Middleware = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ msg: "UnAuthorized HTTP, Token not provided" })
  }
  // console.log(token)
  const jwtToken = token.replace("Bearer", "").trim();
  // const jwtToken = token;
  // console.log(jwtToken)
  try {
    const isVarified = jwt.verify(jwtToken, process.env.JWT_SECRET)
    console.log(isVarified)
    console.log("id: ", isVarified._id)
    // console.log("In")
    // const userdata = await User.findOne({ email: isVarified.email }).
    const userdata = await User.findOne({ _id: isVarified._id }).
      select({
        password: 0,
      })
    // console.log("Data is "+userdata)
    req.user = userdata;
    req.token = token;
    // req.userId = userdata._id;
    console.log("object6");
    next();
    // console.log("object4");
  } catch (error) {
    return res.status(401).json({ msg: "unAuthorized. Invalid token" })

  }
}

module.exports = Auth_Middleware;