const servicemodel = require("../models/serviceModel");

const service = async (req, res) => {
  try {
    const response = await servicemodel.find();
    if (!response) {
      res.status(404).json({ msg: response });
      return;
    }
    res.status(200).json({ msg: response });

  }
  catch (error) {
    console.log("services : ", error);
  }
};

module.exports = {
  service
};

