const { validationResult } = require("express-validator");
const UserSchema = require("../models/user-schema");

exports.updateUsername = async (req, res, next) => {
  const errors = validationResult(req);
  console.log("6 useSettings");
  if (!errors.isEmpty()) {
    console.log("8 use Settings");
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  if (!req.session.isLoggedIn) {
    console.log("error 16");
    return res.status(401).send({
      message: `Not Authorized!`,
      error: [{ error: "Please login" }],
    });
  }

  const username = req.body.username;

  try {
    const foundUser = await UserSchema.findById(req.userId);
    foundUser.username = username;
    const result = await foundUser.save();
    return res.status(201).json({
      message: "Username Updated!",
      userId: result._id,
      status: 201,
    });
  } catch (err) {
    return res.status(401).json({
      message: `Server Error!`,
      error: [{ error: "Server Error" }],
    });
  }
};
