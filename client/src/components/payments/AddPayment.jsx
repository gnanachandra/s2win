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
import { useParams } from "react-router-dom";
import { addPayment } from "../../redux/userSlice";


const AddPayment = ({open,handleOpen}) => {
  const form = useForm();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    const obj1 = errorMessages[0];
    toast.error(errorMessages[0]?.message || Object.values(obj1)[0].message);
  }
  const dispatch = useDispatch();
  const {id} = useParams();
  const addNewPayment = async(data) => {
    data["client"] = id;
    console.log(data);
    const response = await dispatch(addPayment(data));
    if(response.meta.requestStatus === "fulfilled")
    {
      handleOpen();
    }
    else{
      toast.error(response?.error?.payload?.message)
    }
   
  }
  return (
    <div>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Fill payment details</DialogHeader>
        <DialogBody divider>
          <form
            onSubmit={handleSubmit(addNewPayment)}
            className="flex flex-col gap-5"
          >
            <Input
              label="Amount"
              defaultValue={0}
              {...register("amount", {
                valueAsNumber : true,
                required: {
                  value: true,
                  message: "Enter Amount",
                },
                validate : {
                  isNumber : (fieldValue) => {
                    return Number(fieldValue) || "Enter valid amount"
                  }
                }
              })}
            />
            <Input
              label="Mode of payment"
              {...register("mode", {
                required: {
                  value: true,
                  message: "Enter Mode of payment",
                },
                
              })}
            />
            
           
            <Input
              label="Date of Payment"
              type="date"
              {...register("date", {
                valueAsDate : true,
                required: {
                  value: true,
                  message: "Enter Date",
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
}

export default AddPayment