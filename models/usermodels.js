const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  // is_verified: {
  //   type: Number,
  //   default: 0
  // },
  // images: {
  //   type: String,
  //   required: true
  // }
})

//Secamd way to hash the password using 'pre()' method: this 'pre()' will execute before data is stored in the databse.
userSchema.pre('save', async function (next) {
  console.log("Pre() method ", this) //Here 'this' will have all user input data before inserting the database
  const user = this;
  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRounds = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(user.password, saltRounds)
    user.password = hash_pass
  } catch (error) {
    next(error);
  }
})

//secand way to Compare the password
userSchema.methods.compare_Pass = async function (password) {
  return bcrypt.compare(password, this.password)
}
//Authentication using JWT 'json web token
/* JWT(json web token):-
        Jwts are often used for authentication and authorization in web application.
        1- Authentication:- varifying the identity of the user and client.
        2- Authorization:- Determining what actions a user is allowed to perform.
 */
// Here 'methods' thus is called instance method. and it will help to create number of methonds or functions and use in any individual page
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign({
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin
    }, process.env.JWT_SECRET, { expiresIn: '3d' }) /* 3 days */
  } catch (error) {
    console.log('message' + error)
  }
}

//define the model or the collection name
const User = new mongoose.model('user', userSchema);

module.exports = User;