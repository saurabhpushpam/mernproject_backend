const { Schema, model, mongoose } = require('mongoose');
// const { jwt } = require("jsonwebtoken");

const serviceSchema = new Schema({
  service: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },

});


const service = new model("service", serviceSchema);

// module.exports = mongoose.model("User", userSchema);

module.exports = service;