const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mernbythapa"
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI;
console.log(URI);

const connectDb = async () => {
  try {

    await mongoose.connect(URI);
    console.log("Connection succesful established to database");

  } catch (error) {

    console.log("database connection failed");
    process.exit(0);

  }
}

module.exports = connectDb;