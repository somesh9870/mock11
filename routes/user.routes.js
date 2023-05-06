const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

// using in-built router of express
const userRouter = express.Router();

// to register a new user
userRouter.post("/register", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    //  to check if email is already exist or not
    const emailExists = await UserModel.findOne({ email: email });

    // if email exists it will say email already exists
    if (emailExists) {
      res.status(400).send({ msg: "Email already exists" });
    }

    // if emailexits false it will bcrypt the password and register the user
    else {
      bcrypt.hash(password, 5, async (err, hash) => {
        const payload = {
          name,
          email,
          password: hash,
          isAdmin,
        };

        const user = new UserModel(payload);
        await user.save();
        res.status(201).send({ msg: "Registration successful" });
      });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

// to sign in the existing user
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(201).send({
            msg: "Login successful",
            token: jwt.sign(
              { userID: user._id, isAdmin: user.isAdmin },
              "masai"
            ),
          });
        } else {
          res.status(400).send({ msg: "Invalid password" });
        }
      });
    } else {
      res.status(400).send({ msg: "Email not found , Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = userRouter;
