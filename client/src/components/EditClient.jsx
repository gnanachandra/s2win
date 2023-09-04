/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateClient } from "../redux/userSlice";

const EditClient = ({ open, handleOpen }) => {
  const { client } = useSelector((state) => state["user"]);
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);
  const [hasBranches, setHasBranches] = useState(client?.hasBranches);
  const [paymentType, setPaymentType] = useState(client?.paymentType);

  if (errorMessages.length !== 0) {
    const obj1 = errorMessages[0];
    toast.error(errorMessages[0]?.message || Object.values(obj1)[0].message);
  }

  const dispatch = useDispatch();

  const editClientDetails = async (data) => {
    console.log(data);
    data["hasBranches"] = hasBranches;
    data["paymentType"] = paymentType;
    data["id"] = client?._id;
    const response = await dispatch(updateClient(data));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success(response.payload.message);
      handleOpen();
    } else {
      toast.error(response?.payload?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    // Update the state when client data changes
    setPaymentType(client?.paymentType);
    setHasBranches(client?.hasBranches);
  }, [client]);
  return (
    <div>
      <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="h-[36rem] overflow-auto"
      >
        <DialogHeader>Edit client details</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={handleSubmit(editClientDetails)}
            className="flex flex-col gap-5"
          >
            <Input
              label="client name"
              defaultValue={client?.name}
              {...register("name", {
                required: {
                  value: true,
                  message: "Enter client name",
                },
              })}
            />
            <Input
              label="contact number"
              defaultValue={client?.contact}
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
              defaultValue={client?.url}
              label="client url"
              {...register("url", {
                required: {
                  value: true,
                  message: "Enter client url",
                },
              })}
            />
            <Input
              defaultValue={client?.loginId}
              label="LoginId"
              {...register("loginId", {
                required: {
                  value: true,
                  message: "Enter Login ID",
                },
              })}
            />
            <Input
              defaultValue={client?.password}
              label="Password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Enter client Password",
                },
              })}
            />
            <div className="flex gap-2 items-center">
              <label htmlFor="paymentType">Payment Type</label>
              <input
                type="radio"
                name="paymentType"
                id="paymentType"
                value={"perStudent"}
                checked={paymentType === "perStudent"}
                onClick={(e) => setPaymentType(e.target.value)}
              />
              <label htmlFor="yes">Per Student</label>
              <input
                type="radio"
                name="paymentType"
                id="perBranch"
                value={"perBranch"}
                checked={paymentType === "perBranch"}
                disabled={hasBranches === "no"}
                onClick={(e) => setPaymentType(e.target.value)}
              />
              <label htmlFor="no">Per Branch</label>
            </div>
            <Input
              label={" Amount"}
              defaultValue={client?.amount}
              onChange={(e) => console.log(e.target.value)}
              {...register("amount", {
                required: {
                  value: true,
                  message: "Amount is required",
                },
                valueAsNumber: true,
                validate: {
                  isNumber: (fieldValue) => {
                    return Number(fieldValue) || "Enter a valid Amount";
                  },
                  isValid: (fieldValue) => {
                    return (
                      Number(fieldValue) > 0 || "Enter a Valid Amount (>0)"
                    );
                  },
                },
              })}
            />
            <div className="flex gap-2 items-center">
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
                disabled = {hasBranches === "yes"}
                onClick={(e) => setHasBranches(e.target.value)}
              />
              <label htmlFor="no">No</label>
            </div>
            {hasBranches === "no" && (
              <Input
                label="Students Count"
                defaultValue={client?.totalStrength}
                {...register("studentsCount", {
                  required: {
                    value: true,
                    message: "Enter Students count",
                  },
                  valueAsNumber: true,
                  validate: {
                    isNumber: (fieldValue) => {
                      return (
                        (Number(fieldValue) && Number(fieldValue) > 0) ||
                        "Enter valid students count"
                      );
                    },
                  },
                })}
              />
            )}
            <div className="flex justify-between items-center mb-5">
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

export default EditClient;
