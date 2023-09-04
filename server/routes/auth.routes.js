import express from "express";
import { login } from "../controllers/auth.controller.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(async(req,res)=>{
    req.body.password = await bcrypt.hash(req.body.password,10);
    const user = await User.create(req.body);
    return res.status(StatusCodes.OK).json({message : "user created",user})
})
export default router;
