const { Schema } = require("zod");

const validate = (Schema) => async (req, res, next) => {
  try {
    const parsebody = await Schema.parseAsync(req.body);
    req.body = parsebody;
    next();
  } catch (err) {
    // res.status(400).json({ msg: error })
    console.log(err);

    // const message = err.errors[0].message;
    // res.status(400).json({ msg: message })

    const status = 422;
    const message = 'fill the input properly';
    const extraDetails = err.errors[0].message;

    const error = {
      status,
      message,
      extraDetails
    };
    next(error);
  }
}

module.exports = validate;