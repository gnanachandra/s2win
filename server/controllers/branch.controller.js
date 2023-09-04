import Client from "../models/Client.js";
import Branch from "../models/Branch.js";
import asyncHandler from "express-async-handler"
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export const addBranch = asyncHandler(async (req, res) => {
    const {name,contact,loginID,branchStrength,password,client} = req.body;
  
    if (!name || !contact || !loginID || !branchStrength || !password || !client) {
      throw new Error('Fill all details', StatusCodes.BAD_REQUEST);
    }
    const isBranch = await Branch.findOne({ name });
    if (isBranch) {
      throw new Error('Branch URL already registered', StatusCodes.CONFLICT);
    }
    const newBranch = await Branch.create(req.body);
    const data = await Client.findOne({_id : req.body.client}).populate(["branches","payments"]);
    console.log(data);
    return res.status(StatusCodes.OK).json({ message: `${newBranch.name} has been added to branches list`, client:data });
  });
  
  
  export const updateBranch = asyncHandler(async (req, res) => {
    const { id:branchId } = req.params;
    
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
    const client = await Client.findById(response.client).populate(["branches","payments"]);
    return res.status(StatusCodes.OK).json({message: `${branch.name} details are  updated`,client});
  });
  
  
  export const deleteBranch = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      throw new Error('Invalid Branchid', StatusCodes.BAD_REQUEST);
    }
    const branch = await Branch.findById(id);
    if (!branch) { 
      throw new Error('Branch not found', StatusCodes.NOT_FOUND); 
    }
    const response = await Branch.findByIdAndDelete(id);
    const client = await Client.findById(response.client).populate(["branches","payments"])
    return res.status(StatusCodes.OK).json({message: `${branch.name} has been deleted`,client});
  });
  
  export const getBranches = asyncHandler(async(req,res)=>{
    const clientId = req.params.clientId;
    if(!mongoose.isValidObjectId(clientId))
    {
      throw new Error("Not a valid object ID",StatusCodes.BAD_REQUEST);
    }
    const branches = await Branch.find({client : clientId})
    return res.status(StatusCodes.OK).json({message : `Client branches details sent`,branches});
  })
  
  export const getBranch = asyncHandler(async(req,res)=>{
    const branchId = req.params.branchId;
    if(!mongoose.isValidObjectId(branchId))
    {
      throw new Error("Not a valid object ID",StatusCodes.BAD_REQUEST);
    }
    const branch = await Branch.findById(branchId)
    console.log(branch)
    return res.status(StatusCodes.OK).json({message : "branch details sent",branch})
  })