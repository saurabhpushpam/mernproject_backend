const user = require("../models/userModel");

const bcryptjs = require('bcryptjs');

const config = require("../config/config");

const jwt = require("jsonwebtoken");

const nodemailer = require("nodemailer");

const randomstring = require("randomstring");



const home = async (req, res) => {
    try {
        res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
        console.log(error);
    }
};



const create_token = async (id) => {

    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}




// secure password :-
// const saltRound = 10;
// const hash_password = await bcryptjs.hashSync(password, saltRound);

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    }
    catch (error) {

        res.status(400).send(error.message);

    }
}

const register_user = async (req, res) => {


    try {

        const spassword = await securePassword(req.body.password);

        // const users = new user({
        //     name: req.body.name,
        //     email: req.body.email,
        //     phone: req.body.phone,
        //     password: spassword,
        //     type: req.body.type

        // });



        const { name, email, phone, password } = req.body;

        // we can write {email : email} or {email}
        const userExist = await user.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists" });
        }

        const userCreated = await user.create({ name, email, phone, password: spassword });

        const newid = userCreated._id;
        const token = await jwt.sign({ _id: newid }, config.secret_jwt);
        // res.status(201).json({ message: "User registered successfully" });
        res.status(201).json({ msg: userCreated, token: token, userId: userCreated._id.toString() });


        /*
                res.status(201).json({
                    msg: "Registration Successful",
                    token: await userCreated.generateToken(),
                    userId: userCreated._id.toString(),
                });
        
        */

        // const userData = await user.findOne({ email: req.body.email });
        // if (userData) {
        //     res.status(200).send({ success: false, msg: "This email is already exist" });

        // }
        // else {
        //     const user_data = await users.save();
        //     res.status(200).send({ success: true, data: user_data });
        // }

    }

    catch (error) {

        // res.status(500).json({ message: "Internal server error" });
        res.status(400).send(error.message);
        // next(error)     // refer to error-middleware
    }
}

//login Method

const user_login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;


        const userData = await user.findOne({ email: email });

        if (userData) {

            // compare() is a function of bcryptjs, in that function we compare 2 values
            // first value "password" which user pass at the time of login
            // and second value "userData.password" means the original password stored in database

            const passwordmatch = await bcryptjs.compare(password, userData.password);

            if (passwordmatch) {

                const tokenData = await create_token(userData._id);


                const userResult = {
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    password: userData.password,
                    phone: userData.phone,
                    Admin: userData.isAdmin,
                    token: tokenData

                }

                const response = {
                    success: true,
                    msg: "Login Successful, User Details",
                    message: "Login Successful, User Details",
                    data: userResult

                }

                res.status(200).send(response);

            }
            else {
                res.status(400).send({ success: false, msg: "login details are incorrect", message: "login details are incorrect" });
            }

        }
        else {
            res.status(400).send({ success: false, msg: "login details are incorrect", message: "login details are incorrect" });
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}


// *-------------------
// User Logic
// *-------------------

const userdata = async (req, res) => {
    try {
        // const userData = await User.find({});
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(` error from user route ${error}`);
    }
};





const getuser = async (req, res) => {
    try {

        const data = await Store.find();
        const formattedData = data.map(item => ({

            id: item._id,
            phone: item.phone,
            file: item.file_url
        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getusers = async (req, res) => {
    try {

        const data = await user.find();
        const formattedData = data.map(item => ({

            id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            password: item.password,
            type: item.type

        }));

        // Send the formatted data as the response
        res.status(200).json(formattedData);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
// get data by id
const getdetailbyid = async (req, res) => {
    try {

        //const id= req.body.id;
        const id = req.params.id;

        const data = await userproduct.findOne({ _id: id });

        if (data) {

            /*
                       const getImagePath = (imageName) => {
                           // Construct the path to the image in the 'public/images' directory
                           const imagePath = path.join(__dirname, '..', 'public', 'productImages', imageName);
                           return imagePath;
                       };
           
                       const imageName = data.images;
                       const imagePath = getImagePath(imageName);
                       const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' });
           
                       const responseData = {
                           id: data._id,
                           title: data.title,
                           description: data.description,
                           price: data.price,
                           images: data.images,
                           imagePath: imagePath,
                         //  image_Base64: `data:image/png;base64, ${imageBase64}`
                       };
           
                       res.json(responseData);
           */

            //     const imageName = data.images;
            //     const imagePath = path.join(__dirname, '..', 'public/productImages', imageName);
            res.status(200).send({ success: true, msg: "product details :", data: { data } });

        } else {
            res.status(200).send({ success: false, msg: "id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}






// update password method

const update_password = async (req, res) => {
    try {

        const user_id = req.body.id;
        const password = req.body.password;

        const data = await user.findOne({ _id: user_id });

        if (data) {

            const newpassword = await securePassword(password);

            const userData = await user.findByIdAndUpdate({ _id: user_id }, {
                $set: {
                    password: newpassword
                }
            });

            res.status(200).send({ success: true, msg: "your password has been updated" });

        } else {
            res.status(200).send({ success: false, msg: "User id not found!" });
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}


// forget and reset password

// forget password

const sendresetpasswordmail = async (username, email, token) => {

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: config.emailUser,
                pass: config.emailPassword
            }
        });

        const mailOption = {
            from: config.emailUser,
            to: email,
            subject: 'For reset password',
            html: '<p> Hii ' + username + ', please copy the link <a href= "http://localhost:3000/api/reset-password?token=' + token + '"> and reset your password </a>'
        }

        transporter.sendMail(mailOption, function (error, info) {
            if (error) {
                console.log(error);

            }
            else {
                console.log("Mail has been sent : ", info.response);
            }
        });



    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

const forget_password = async (req, res) => {

    try {
        const email = req.body.email;
        const userData = await user.findOne({ email: email });
        if (userData) {

            const Randomstring = randomstring.generate();
            const data = await user.updateOne({ email: email }, { $set: { token: Randomstring } });
            sendresetpasswordmail(userData.name, userData.email, Randomstring);
            res.status(200).send({ success: true, msg: "Please check your inbox of email and reset your password" })

        }
        else {

            res.status(200).send({ success: true, msg: "This email does not exist" });

        }

    } catch (error) {

        res.status(200).send({ success: false, msg: error.message });

    }

}

// reset password

const reset_password = async (req, res) => {
    try {
        const token = req.query.token;
        const tokenData = await user.findOne({ token: token });

        if (tokenData) {
            const password = req.body.password;
            const newpassword = await securePassword(password);
            const userdata = await user.findByIdAndUpdate({ _id: tokenData._id }, { $set: { password: newpassword, token: '' } }, { new: true })

            res.status(200).send({ success: true, msg: "User password has been reset", data: userdata })
        } else {
            res.status(200).send({ success: true, msg: "This link is invalid" });
        }

    } catch (error) {
        res.status(200).send({ success: false, msg: error.message });
    }
}


module.exports = {
    home,
    register_user,
    user_login,
    update_password,
    forget_password,
    reset_password,
    userdata
}