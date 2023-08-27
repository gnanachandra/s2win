import Client from "../models/Client.js";
import asyncHandler from "express-async-handler"
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";


export const addClient = asyncHandler(async(req,res)=> {
    const {name,contact,url,hasBranches,loginId,password,perStudentAmount,} = req.body;
    if(!name || !contact || !url || !hasBranches || !loginId || !password || !perStudentAmount)
    {
        throw new Error("Fill all details",StatusCodes.BAD_REQUEST);
    }
    const isClient = await Client.findOne({url});
    if(isClient)
    {
        throw new Error("Client already registered",StatusCodes.CONFLICT);
    }
    const newClient = await Client.create(req.body);
    const clients = await Client.find({}).populate(["branches","payments"])
    return res.status(StatusCodes.OK).json({message : `${newClient.name} has been added to clients list`,clients})
})

export const getClients = asyncHandler(async(req,res)=> {
    const clients = await Client.find({}).populate(["branches","payments"])
    return res.status(StatusCodes.OK).json({message : `All clients details sent`,clients})
})

export const getClient = asyncHandler(async(req,res)=>{
    const clientId = req.params.id;
    if(!mongoose.isValidObjectId(clientId))
    {
        throw new Error("Not a valid mongodb ID",StatusCodes.BAD_REQUEST)
    }
    const client = await Client.findById(clientId).populate(["branches","payments"])
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
    const clients = await Client.find({}).populate(["branches","payments"])
    return res.status(StatusCodes.OK).json({message : `Client ${client.name} details has been deleted`,clients});
})