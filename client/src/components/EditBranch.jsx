/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { updateBranchDetails } from "../redux/userSlice";
const EditBranch = ({ open, handleOpen }) => {
  const dispatch = useDispatch();
  const { branch } = useSelector((state) => state["user"]);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);

  if (errorMessages.length !== 0) {
    const obj1 = errorMessages[0];
    toast.error(errorMessages[0]?.message || Object.values(obj1)[0].message);
  }

  const editBranchDetails = async (data) => {
    data["id"] = branch._id;
    const response = await dispatch(updateBranchDetails(data));
    handleOpen();
  };
  return (
    <div>
      <Dialog open={open} handler={handleOpen} size="sm">
        <DialogHeader>Add New Branch</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={handleSubmit(editBranchDetails)}
            className="flex flex-col gap-5"
          >
            <Input
              required
              label="branch name"
              defaultValue={branch?.name}
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
              defaultValue={branch?.branchCode}
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
              defaultValue={branch?.contact}
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
              defaultValue={branch?.branchStrength}
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
              defaultValue={branch?.loginID}
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
              defaultValue={branch?.password}
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

export default EditBranch;
