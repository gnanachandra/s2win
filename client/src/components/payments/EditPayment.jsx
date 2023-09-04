/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { updatePayment, updatePaymentFields } from "../../redux/userSlice";

const EditPayment = ({ open, handleOpen }) => {
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state["user"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", payment);
    dispatch(updatePayment(payment));
  };

  return (
    <div>
      <Dialog open={open} handler={handleOpen} size="xs">
        <DialogHeader>Fill payment details</DialogHeader>
        <DialogBody divider>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Amount"
              type="number"
              value={payment.amount}
              onChange={(e) =>
                dispatch(
                  updatePaymentFields({
                    field: "amount",
                    value: parseInt(e.target.value),
                  })
                )
              }
            />
            <Input
              label="Mode of payment"
              value={payment.mode}
              onChange={(e) =>
                dispatch(
                  updatePaymentFields({
                    field: "mode",
                    value: e.target.value,
                  })
                )
              }
            />

            <Input
              label="Date of Payment"
              type="date"
              value={payment.date.split("T")[0]}
              onChange={(e) =>
                dispatch(
                  updatePaymentFields({
                    field: "date",
                    value: e.target.value,
                  })
                )
              }
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

export default EditPayment;
