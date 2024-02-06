/*

const express = require("express");
const router = express.Router();

const services = require("../controllers/serviceController")

// router.route("/service").get(services);

router.get('/service', services.service);

module.exports = router;



*/


const express = require("express");
const service_routes = express();

const bodyParser = require("body-parser");
service_routes.use(bodyParser.json());
service_routes.use(bodyParser.urlencoded({ extended: true }));

const contactvalidation = require('../validators/zod_contact-validator')
const validate = require("../middleware/zod_validate-middleware")

const servicecontroller = require("../controllers/serviceController");

// router.route("/contact").post(contactForm);
service_routes.get('/service', servicecontroller.service);


module.exports = service_routes;