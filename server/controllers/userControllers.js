import Client from "../models/Client.js";
import Branch from "../models/Branch.js";
import asyncHandler from "express-async-handler"
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import Payment from "../models/Payment.js";
// client
// create = add new client
// read ( get all client + get each client)
// update
// delete - delete client and their branches


export const addClient = asyncHandler(async(req,res)=> {
    const {name,contact,url,hasBranches} = req.body;
    if(!name || !contact || !url || !hasBranches)
    {
        throw new Error("Fill all details",StatusCodes.BAD_REQUEST);
    }
    const isClient = await Client.findOne({url});
    if(isClient)
    {
        throw new Error("Client already registered",StatusCodes.CONFLICT);
    }
    const newClient = await Client.create(req.body);
    const clients = await Client.find({}).populate([{path : "branches",populate : [{path : "payments"}]}]);
    return res.status(StatusCodes.OK).json({message : `${newClient.name} has been added to clients list`,clients})
})

export const getClients = asyncHandler(async(req,res)=> {
    const clients = await Client.find({}).populate("branches").populate([{path : "branches",populate : [{path : "payments"}]}]);
    return res.status(StatusCodes.OK).json({message : `All clients details sent`,clients})
})

export const getClient = asyncHandler(async(req,res)=>{
    const clientId = req.params.id;
    if(!mongoose.isValidObjectId(clientId))
    {
        throw new Error("Not a valid mongodb ID",StatusCodes.BAD_REQUEST)
    }
    const client = await Client.findById(clientId).populate([{path : "branches",populate : [{path : "payments"}]}]);
    if(!client)
    {
        throw new Error("Client details not found",StatusCodes.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json({message : `Client ${client.name} details has been sent`,client});
})


export const deleteClient = asyncHandler(async(req,res)=>{
    const clientId = req.params.id;
    if(!mongoose.isValidObjectId(clientId))
    {
        throw new Error("Not a valid mongodb ID",StatusCodes.BAD_REQUEST)
    }
    const client = await Client.findById(clientId);
    if(!client)
    {
        throw new Error("Client details not found",StatusCodes.NOT_FOUND);
    }
    const response = await Client.findByIdAndDelete(clientId);
    const clients = await Client.find({}).populate([{path : "branches",populate : [{path : "payments"}]}]);
    return res.status(StatusCodes.OK).json({message : `Client ${client.name} details has been deleted`,clients});
})



//branches
//create - add new branch
// read - getall branches 
//update - strength update
//delete



export const addBranch = asyncHandler(async (req, res) => {
  const {name,contact,loginID,branchStrength,password,client,} = req.body;

  if (!name || !contact || !loginID || !branchStrength || !password || !client) {
    throw new Error('Fill all details', StatusCodes.BAD_REQUEST);
  }
  const isBranch = await Branch.findOne({ name });
  if (isBranch) {
    throw new Error('Branch URL already registered', StatusCodes.CONFLICT);
  }
  const newBranch = await Branch.create(req.body);
  const data = await Client.findOne({_id : req.body.client}).populate([{path : "branches",populate : [{path : "payments"}]}]);
  console.log(data);
  return res.status(StatusCodes.OK).json({ message: `${newBranch.name} has been added to branches list`, client:data });
});


export const updateBranch = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  if (!mongoose.isValidObjectId(branchId)) {
    throw new Error('Invalid branchId', StatusCodes.BAD_REQUEST);
  }
  const branch = await Branch.findById(branchId);
  if (!branch) {
    throw new Error('Branch not found', StatusCodes.NOT_FOUND);
  }
  const response = await Branch.findByIdAndUpdate(branchId,req.body,{
    runValidators : true
  })
  const branches = await Branch.find({});
  return res.status(StatusCodes.OK).json({message: `${branch.name} has been updated`,branches});
});


export const deleteBranch = asyncHandler(async (req, res) => {
  const { branchId } = req.params;
  console.log(req.params)
  if (!mongoose.isValidObjectId(branchId)) {
    throw new Error('Invalid branchId', StatusCodes.BAD_REQUEST);
  }
  const branch = await Branch.findById(branchId);
  if (!branch) { 
    throw new Error('Branch not found', StatusCodes.NOT_FOUND); 
  }
  const response = await Branch.findByIdAndDelete(branchId);
  const client = await Client.findById(response.client).populate([{path : "branches",populate : [{path : "payments"}]}]);
  return res.status(StatusCodes.OK).json({message: `${branch.name} has been deleted`,client});
});

export const getBranches = asyncHandler(async(req,res)=>{
  const clientId = req.params.clientId;
  if(!mongoose.isValidObjectId(clientId))
  {
    throw new Error("Not a valid object ID",StatusCodes.BAD_REQUEST);
  }
  const branches = await Branch.find({client : clientId}).populate("payments");
  return res.status(StatusCodes.OK).json({message : `Client branches details sent`,branches});
})

export const getBranch = asyncHandler(async(req,res)=>{
  const branchId = req.params.branchId;
  if(!mongoose.isValidObjectId(branchId))
  {
    throw new Error("Not a valid object ID",StatusCodes.BAD_REQUEST);
  }
  const branch = await Branch.findById(branchId).populate("payments");
  console.log(branch)
  return res.status(StatusCodes.OK).json({message : "branch details sent",branch})
})

//payment

export const addPayment = asyncHandler(async(req,res)=>{
  const {branch,client,amount,mode,date} = req.body;
  if(!branch || !client || !amount || !mode || !date) {
    throw new Error("Fill all details",StatusCodes.BAD_REQUEST);
  } 
  const newPayment = await Payment.create(req.body);
  const payments = await Payment.find({branch : branch}).sort({date : -1});
  return res.status(StatusCodes.OK).json({message : `Payment has been added to branch ${branch.name}`,payments})
})

export const deletePayment = asyncHandler(async(req,res)=>{
  const paymentId = req.params.id;
  if(!mongoose.isValidObjectId(paymentId))
  {
    throw new Error("Not a valid payment ID",StatusCodes.BAD_REQUEST);
  }
  const found = await Payment.findById(paymentId);
  if(!found)
  {
    throw new Error("Payment details not found",StatusCodes.NOT_FOUND);
  }
  const response = await findByIdAndDelete(paymentId);
  const payments = await Payment.find({branch : response.branch}).sort({date : -1});
  return res.status(StatusCodes.OK).json({message : `Payment with id ${response.id} has been deleted`})
})

export const getPayments = asyncHandler(async(req,res)=>{
  const branchId = req.params.id;
  if(!mongoose.isValidObjectId(branchId))
  {
    throw new Error("Not a valid object ID",StatusCodes.BAD_REQUEST);
  }
  const payments = await Payment.find({branch : branchId}).sort({date : -1});
  return res.status(StatusCodes.OK).json({message : "Payment details sent !",payments});
})


