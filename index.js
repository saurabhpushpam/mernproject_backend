require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const connectDb = require('./utils/db')

// lets tackle cors- hm cors ka use krte hain taki frontend/backend ko pta chale ki yah port isi ka hi chunki both have different port

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}
app.use(cors(corsOptions));

app.use(express.json());    // it means ki hm apne application me json ka use kr skte hain

const mongoose = require('mongoose');
// mongoose.connect("mongodb://127.0.0.1:27017/mernbythapa");

const errorMiddleware = require("./middleware/error-middleware");

// user routes

const user_route = require("./routes/userRoutes");
app.use('/api', user_route);


// service routes
const service_routes = require("./routes/serviceRoutes");
app.use('/api', service_routes);


app.post('/user', function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
    res.send(req.body.username);

});


const contactRoute = require("./routes/contactRoutes");
app.use('/api', contactRoute)

const adminRoute = require("./routes/AdminRoutes");
app.use('/api', adminRoute)


app.use(errorMiddleware);

const port = 3000;

connectDb().then(() => {

    app.listen(port, function () {
        console.log('server is running at port no.: ', port);
    });

})