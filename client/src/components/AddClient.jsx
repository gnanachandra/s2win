/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addClient } from "../redux/userSlice";

const AddClient = ({ open, handleOpen }) => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);
  const [hasBranches, setHasBranches] = useState("yes");
  if (errorMessages.length !== 0) {
    const obj1 = errorMessages[0];
    toast.error(errorMessages[0]?.message || Object.values(obj1)[0].message);
  }
  const dispatch = useDispatch();
  const addnewClient = async (data) => {
    console.log(data);
    data["hasBranches"] = hasBranches;
    const response = await dispatch(addClient(data));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success(response.payload.message);
      handleOpen();
    } else {
      toast.error(response?.payload?.message || "Something went wrong");
    }
  };
  return (
    <div>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Add New Client</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={handleSubmit(addnewClient)}
            className="flex flex-col gap-5"
          >
            <Input
              label="client name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Enter client name",
                },
              })}
            />
            <Input
              label="contact number"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Enter client contact number",
                },
                validate: {
                  isNumber: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid contact Number";
                  },
                  length: (fieldValue) => {
                    return (
                      fieldValue.length === 10 ||
                      "Contact number must be of 10 digits"
                    );
                  },
                },
              })}
            />
            <Input
              label="client url"
              {...register("url", {
                required: {
                  value: true,
                  message: "Enter client url",
                },
              })}
            />
            <div className="flex gap-2">
              <label htmlFor="hasBranches">Has Branches</label>
              <input
                type="radio"
                name="hasBranches"
                id="yes"
                value={"yes"}
                checked={hasBranches === "yes"}
                onClick={(e) => setHasBranches(e.target.value)}
              />
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                name="hasBranches"
                id="no"
                value={"no"}
                checked={hasBranches === "no"}
                onClick={(e) => setHasBranches(e.target.value)}
              />
              <label htmlFor="no">No</label>
            </div>
            <div>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="gradient" type="submit" color="green">
                <span>Confirm</span>
              </Button>
            </div>
          </form>
        </DialogBody>
        <Toaster position="top-right" />
      </Dialog>
    </div>
  );
};

export default AddClient;