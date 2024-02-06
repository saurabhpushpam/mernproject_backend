const express = require("express");
const user_routes = express();

const auth = require("../middleware/auth");

const authnew = require("../middleware/auth_middleware_bythapa")
const newauth = require("../middleware/newauth")

const validate = require("../middleware/zod_validate-middleware")

const bodyParser = require("body-parser");
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({ extended: true }));


const user_controller = require("../controllers/userController");
const registerSchema = require("../validators/zod_auth-validators");
const loginSchema = require("../validators/zod_login-validator");

user_routes.post('/register', validate(registerSchema), user_controller.register_user);

user_routes.post('/login', validate(loginSchema), user_controller.user_login);

user_routes.get('/user', auth, user_controller.userdata);


// const user_c = require("../controllers/userscontrollers");
// user_routes.get('/log', auth, user_c.userdata);

user_routes.post('/update-password', auth, user_controller.update_password);

user_routes.post('/forget-password', user_controller.forget_password);

user_routes.post('/reset-password', user_controller.reset_password);


user_routes.get('/test', auth, function (req, res) {

   res.status(200).send({ success: true, msg: "Authenticated" })

});


module.exports = user_routes;