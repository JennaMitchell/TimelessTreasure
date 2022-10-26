const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const UserSchema = require("../models/user-schema");
const ObjectId = require("mongodb").ObjectId;
exports.updateUsername = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }
  const username = req.body.username;
  const reqUserId = new ObjectId(req.body.userId);
  try {
    const foundUser = await UserSchema.findById({ _id: reqUserId });
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
exports.updateEmail = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  const email = req.body.email;
  const reqUserId = new ObjectId(req.body.userId);

  try {
    const foundUser = await UserSchema.findById({ _id: reqUserId });
    foundUser.email = email;
    const result = await foundUser.save();
    return res.status(201).json({
      message: "Email Updated!",
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

exports.updatePassword = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  const newPassword = req.body.password;
  const currentPassword = req.body.currentPassword;
  const reqUserId = new ObjectId(req.body.userId);

  let loadedUser;
  try {
    const foundUser = await UserSchema.findById({ _id: reqUserId });

    loadedUser = foundUser;
    const isEqual = await bcrypt.compare(currentPassword, loadedUser.password);

    if (!isEqual) {
      res.status(401).json({
        message: `Invalid Password!`,
        error: [{ error: "Invalid Password" }],
      });
      return;
    }

    foundUser.password = newPassword;
    const result = await foundUser.save();

    return res.status(201).json({
      message: "Password Updated!",
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
exports.deleteAccount = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(401).send({
      error: errors.array(),
      message: `${errors["errors"][0].msg}`,
    });
  }

  const currentPassword = req.body.password;

  const reqUserId = new ObjectId(req.body.userId);

  let loadedUser;
  try {
    const foundUser = await UserSchema.findById({ _id: reqUserId });

    loadedUser = foundUser;
    const isEqual = await bcrypt.compare(currentPassword, loadedUser.password);

    if (!isEqual) {
      res.status(401).json({
        message: `Invalid Password!`,
        error: [{ error: "Invalid Password" }],
      });
      return;
    }

    const result = await UserSchema.deleteOne({ _id: reqUserId });

    return res.status(201).json({
      message: "Account Deleted!",
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
