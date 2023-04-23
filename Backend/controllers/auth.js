import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

//sign Up

export const signUp = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();

    res.status(200).json({
      message: `${req.body.username} signed up successfully`,
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

//sign in

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User does not exist"));

    const verifyPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!verifyPassword)
      return next(createError(400, "Wrong password, please try again"));

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "72h",
    });

    req.token = token;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        message: `${user.username} signed in successfully`,
        user,
        token,
      });
  } catch (error) {
    next(error);
  }
};
