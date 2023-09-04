import Client from "../models/Client.js";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Branch from "../models/Branch.js";
import Payment from "../models/Payment.js";

export const addClient = asyncHandler(async (req, res) => {
  const {
    name,
    contact,
    url,
    hasBranches,
    loginId,
    password,
    amount,
    paymentType,
  } = req.body;
  if (
    !name ||
    !contact ||
    !url ||
    !hasBranches ||
    !loginId ||
    !password ||
    !amount ||
    !paymentType
  ) {
    throw new Error("Fill all details", StatusCodes.BAD_REQUEST);
  }
  const isClient = await Client.findOne({ url });
  if (isClient) {
    throw new Error("Client already registered", StatusCodes.CONFLICT);
  }
  req.body.clientId = await Client.countDocuments() + 1;
  const newClient = await Client.create(req.body);
  const clients = await Client.find({}).populate(["branches", "payments"]);
  return res.status(StatusCodes.OK).json({
    message: `${newClient.name} has been added to clients list`,
    clients,
  });
});

export const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({}).populate(["branches", "payments"]);
  return res
    .status(StatusCodes.OK)
    .json({ message: `All clients details sent`, clients });
});

export const getClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  if (!mongoose.isValidObjectId(clientId)) {
    throw new Error("Not a valid mongodb ID", StatusCodes.BAD_REQUEST);
  }
  const client = await Client.findById(clientId).populate([
    "branches",
    "payments",
  ]);
  if (!client) {
    throw new Error("Client details not found", StatusCodes.NOT_FOUND);
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: `Client ${client.name} details has been sent`, client });
});

export const deleteClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  if (!mongoose.isValidObjectId(clientId)) {
    throw new Error("Not a valid mongodb ID", StatusCodes.BAD_REQUEST);
  }
  const client = await Client.findById(clientId);
  if (!client) {
    throw new Error("Client details not found", StatusCodes.NOT_FOUND);
  }
  const response = await Client.findByIdAndDelete(clientId);
  const branchesResponse = await Branch.deleteMany({ client: response._id });
  const paymentsResponse = await Payment.deleteMany({ client: response._id });
  const clients = await Client.find({}).populate(["branches", "payments"]);
  return res.status(StatusCodes.OK).json({
    message: `Client ${client.name} details has been deleted`,
    clients,
  });
});

export const updateClient = asyncHandler(async (req, res) => {
  const clientId = req.params.id;
  if (!mongoose.isValidObjectId(clientId)) {
    throw new Error("Not a valid client ID", StatusCodes.BAD_REQUEST);
  }
  const client = await Client.findById(clientId).populate(["branches","payments"]);
  if (client.hasBranches === "no" && req.body.hasBranches === "yes") {
    const newBranch = await Branch.create({
      name: "New Branch -1",
      contact: "111222233",
      branchCode: "1231123",
      loginID: "123123",
      password: "1231231",
      branchStrength: client.totalStrength,
      client: client._id,
    });
    req.body.totalStrength = 0;
    const response = await Client.findByIdAndUpdate(clientId, req.body, {
      runValidators: true,
    });
    const clients = await Client.find({}).populate(["branches", "payments"]);
    return res
      .status(StatusCodes.OK)
      .json({ message: "Client details updated", clients });
  }
  if (client.hasBranches === "yes" && req.body.hasBranches === "no") {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Branches cannot be set to NO" });
  }

  const response = await Client.findByIdAndUpdate(clientId, req.body);
  const clients = await Client.find({}).populate(["branches", "payments"]);
  return res
    .status(StatusCodes.OK)
    .json({ message: "Client Details Updated", clients });
});
