const express = require("express");
const { body } = require("express-validator");

const userSettingsController = require("../controllers/user-settings");
const router = express.Router();
const UserSchema = require("../models/user-schema");
const isAuth = require("../middlewear/is-auth");
const loggedInAuth = require("../middlewear/loggedin-auth");

router.patch(
  "/update-username",
  isAuth,
  loggedInAuth,
  [
    body("username")
      .trim()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        return UserSchema.findOne({ username: value }).then((foundUsername) => {
          if (foundUsername) {
            return Promise.reject("Username in use!");
          }
        });
      }),
  ],
  userSettingsController.updateUsername
);
module.exports = router;
