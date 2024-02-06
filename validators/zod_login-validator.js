const { z } = require("zod");

const loginSchema = z.object({

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "email must be atleast of 3 characters" })
    .max(255, { message: "email must be atmost 255" }),

  // phone: z
  //   // .string({ required_error: "phone is required" })
  //   .trim()
  //   .min(10, { message: "phone must be atleast of 10 characters" })
  //   .max(15, { message: "phone must be atmost 15" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(6, { message: "password must be atleast of 6 characters" })
    .max(25, { message: "password must be atmost 25" }),

});

module.exports = loginSchema;