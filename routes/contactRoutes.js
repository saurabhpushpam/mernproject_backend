const express = require("express");
const service_routes = express();

const bodyParser = require("body-parser");
service_routes.use(bodyParser.json());
service_routes.use(bodyParser.urlencoded({ extended: true }));

const contactvalidation = require('../validators/zod_contact-validator')
const validate = require("../middleware/zod_validate-middleware")

const contactcontroller = require("../controllers/contact-controller");

// router.route("/contact").post(contactForm);
service_routes.post('/contact', validate(contactvalidation), contactcontroller.contactForm);


module.exports = service_routes;




