const express = require("express");
const admin_routes = express();

const bodyParser = require("body-parser");
admin_routes.use(bodyParser.json());
admin_routes.use(bodyParser.urlencoded({ extended: true }));

const adminvalidation = require('../validators/zod_contact-validator')
const validate = require("../middleware/zod_validate-middleware")

const auth = require("../middleware/auth");
const adminauth = require("../middleware/admin_middleware");
const admincontroller = require("../controllers/AdminController");

// router.route("/contact").post(contactForm);
admin_routes.get('/users', auth, adminauth, admincontroller.getallusers);

admin_routes.get('/user/:id', auth, adminauth, admincontroller.getuserbyid);

admin_routes.delete('/user/delete/:id', auth, adminauth, admincontroller.deleteuserbyid);

admin_routes.put('/user/update/:id', auth, adminauth, admincontroller.updateuserbyid);

admin_routes.get('/contact', auth, adminauth, admincontroller.getallcontact);

admin_routes.delete('/contact/delete/:id', auth, adminauth, admincontroller.deletecontactbyid);


module.exports = admin_routes;




