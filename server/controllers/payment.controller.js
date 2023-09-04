import Branch from "../models/Branch.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
import Client from "../models/Client.js";

export const addPayment = asyncHandler(async (req, res) => {
  const { client, amount, mode, date } = req.body;
  if (!client || !amount || !mode || !date) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  req.body.id = await Payment.countDocuments() + 1;
  const newPayment = await Payment.create(req.body);
  const data = await Client.findById(client).populate(["branches", "payments"]);
  return res.status(StatusCodes.OK).json({
    message: `Payment has been added to client ${client.name}`,
    client: data,
  });
});

export const getPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  if (!mongoose.isValidObjectId(id)) {
    throw new Error("Not a valid mongoDB id", StatusCodes.BAD_REQUEST);
  }
  const payment = await Payment.findById(id);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Payment Details sent", payment });
});

export const updatePayment = asyncHandler(async (req, res) => {
  const { _id, client, amount, mode, date } = req.body;
  if (!client || !amount || !mode || !date) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const updatedPayment = await Payment.findByIdAndUpdate(_id, req.body, {
    new: true,
    runValidators: true,
  });
  const payments = await Payment.find({}).sort({ date: -1 }).populate("client");
  return res.status(StatusCodes.OK).json({
    message: `Payment has been updated`,
    payments,
  });
});

export const deletePayment = asyncHandler(async (req, res) => {
  const paymentId = req.params.id;
  if (!mongoose.isValidObjectId(paymentId)) {
    throw new Error("Not a valid payment ID", StatusCodes.BAD_REQUEST);
  }
  const found = await Payment.findById(paymentId);
  if (!found) {
    throw new Error("Payment details not found", StatusCodes.NOT_FOUND);
  }
  const response = await Payment.findByIdAndDelete(paymentId);
  const data = await Client.findById(response.client).populate([
    "branches",
    "payments",
  ]);
  const payments = await Payment.find({}).sort({ date: -1 }).populate("client");
  return res.status(StatusCodes.OK).json({
    message: `Payment with id ${response.id} has been deleted`,
    client: data,
    payments,
  });
});

export const getPayments = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  if (!mongoose.isValidObjectId(clientId)) {
    throw new Error("Not a valid object ID", StatusCodes.BAD_REQUEST);
  }
  const payments = await Payment.find({ client: clientId }).sort({ date: -1 });
  return res
    .status(StatusCodes.OK)
    .json({ message: "Payment details sent !", payments });
});

export const getAllPayments = asyncHandler(async (req, res) => {
  const payments = await Payment.find({}).sort({ date: -1 }).populate("client");
  return res
    .status(StatusCodes.OK)
    .json({ message: "All payments Sent", payments });
});
