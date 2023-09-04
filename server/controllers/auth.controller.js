import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export const  login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Enter all details", StatusCodes.BAD_REQUEST);
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User Not found", StatusCodes.NOT_FOUND);
  }
  const match = await user.comparePassword(password);
  if (!match) {
    throw new Error("Invalid credentials", StatusCodes.UNAUTHORIZED);
  }
  const accessToken = await user.createAccessToken();
  return res
    .status(StatusCodes.OK)
    .json({ message: "Login successful", accessToken: accessToken, user });
});
