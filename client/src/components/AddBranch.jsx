/* eslint-disable react/prop-types */
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
import { addBranch } from "../redux/userSlice";
import { useParams } from "react-router-dom";

const AddBranch = ({ open, handleOpen }) => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    const obj1 = errorMessages[0];
    toast.error(errorMessages[0]?.message || Object.values(obj1)[0].message);
  }
  const dispatch = useDispatch();
  const { id } = useParams();
  const addNewBranch = async (data) => {
    console.log(data);
    data["client"] = id;
    console.log(data);
    const response = await dispatch(addBranch(data));
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
        <DialogHeader>Add New Branch</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={handleSubmit(addNewBranch)}
            className="flex flex-col gap-5"
          >
            <Input
              required
              label="branch name"
              {...register("name", {
                required: {
                  value: true,
                  message: "Enter branch name",
                },
              })}
            />

            <Input
              required
              label="branch code"
              {...register("branchCode", {
                required: {
                  value: true,
                  message: "Enter branch code",
                },
              })}
            />
            <Input
              required
              label="contact number"
              {...register("contact", {
                required: {
                  value: true,
                  message: "Enter branch contact number",
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
              required
              label="Branch Strength"
              {...register("branchStrength", {
                required: {
                  value: true,
                  message: "Enter Branch Strength",
                },
                validate: {
                  isNumber: (fieldValue) => {
                    return (
                      Number(fieldValue) || "Enter a valid Branch Strength"
                    );
                  },
                },
              })}
            />

            <Input
            required
              label="LoginID"
              {...register("loginID", {
                required: {
                  value: true,
                  message: "Enter branch loginID",
                },
              })}
            />
            <Input
            required
              label="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Enter password",
                },
              })}
            />

            <div className="flex justify-between">
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

export default AddBranch;
