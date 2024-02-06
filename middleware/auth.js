const jwt = require("jsonwebtoken");
const config = require("../config/config");

//const connect= require("../mongooseconnect");

const verifyToken = async (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
        res.status(200).send({ success: false, msg: "A token is required for authentication" });

    }
    try {

        const descode = jwt.verify(token, config.secret_jwt);
        // req.user= descode;

        //
        const User = require('../models/userModel')
        const userdata = await User.findOne({ _id: descode._id }).
            select({
                password: 0,        //password choorkar sbkuch de dega
            })
        req.user = userdata;
        //

    }
    catch (error) {

        res.status(400).send("Invalid Token");

    }

    return next();

}


module.exports = verifyToken;