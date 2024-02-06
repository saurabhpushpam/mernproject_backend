const usermodel = require("../models/userModel");
const contactmodel = require("../models/contactModel");

const getallusers = async (req, res) => {
  try {
    // const users = await usermodel.find();
    // const users = await usermodel.find({}, {password:1});  - only password aayega, if password:0 then password chhorkr sab aayega

    const users = await usermodel.find({}, { password: 0 });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" })
    }
    return res.status(200).json(users);
  } catch (error) {

    next(error);
  }
};

const getallcontact = async (req, res) => {
  try {
    const contact = await contactmodel.find();

    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "No users found" })
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.log(error);
    // next(error);
  }
};

const deleteuserbyid = async (req, res) => {
  try {
    const id = req.params.id;

    await usermodel.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });

  } catch (error) {
    next(error);
  }
}

const getuserbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await usermodel.findOne({ _id: id }, { password: 0 });
    return res.status(200).json(data);

  } catch (error) {
    next(error);
  }
}


const updateuserbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedata = req.body;

    const updateuser = await usermodel.updateOne({ _id: id },
      {
        $set: updatedata
      });

    return res.status(200).json(updatedata);

  } catch (error) {
    next(error);
  }
}

const deletecontactbyid = async (req, res) => {
  try {
    const id = req.params.id;

    await contactmodel.deleteOne({ _id: id });
    return res.status(200).json({ message: "Contact Deleted Successfully" });

  } catch (error) {
    next(error);
  }
}

module.exports = {
  getallusers,
  getallcontact,
  deleteuserbyid,
  getuserbyid,
  updateuserbyid,
  deletecontactbyid
}