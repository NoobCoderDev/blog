import { validationResult } from "express-validator";
import UserModel from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import tokenModel from "../Model/token.js";

dotenv.config();

// Create a user
export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      if (password.length < 8) {
        return res
          .status(422)
          .json({ message: "Password must have at least 8 characters." });
      }
      return res
        .status(401)
        .json({ error: "Bad request", errorMessage: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      let result = await UserModel.create({
        username,
        email,
        password: hashedPassword,
      });
      return res
        .status(200)
        .json({ message: "User successfully registered.", result });
    } catch (error) {
      console.log(error);
      if (error.keyPattern.username) {
        return res.status(400).json({ message: "Username already exists." });
      }
      if (error.keyPattern.email) {
        return res.status(400).json({ message: "Email already exists." });
      }
      console.log(error);
      throw error;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// find user
export const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      if (password.length < 8) {
        return res.status(422).json({ message: "Invalid password." });
      }
      return res
        .status(401)
        .json({ error: "Bad request", errorMessage: errors.array() });
    }

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "This email is not registered." });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const accessToken = jwt.sign(
          user.toJSON(),
          process.env.ACCESS_SECRET_KEY,
          { expiresIn: "1m" }
        );
        const refreshToken = jwt.sign(
          user.toJSON(),
          process.env.REFRESH_SECRET_KEY
        );

        const newToken = new tokenModel({ token: refreshToken });
        await newToken.save();

        return res.status(200).json({
          accessToken: accessToken,
          refreshToken: refreshToken,
          user_id: user._id,
          username: user.username,
          email: user.email,            
          message: "User successfully logged in.",
        });
      } else {
        return res.status(401).json({ message: "Invalid Password." });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal server error." });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};