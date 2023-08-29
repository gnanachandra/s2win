/* eslint-disable react/prop-types */
import { Dialog } from "@material-tailwind/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentDetails } from "../../redux/userSlice";

const EditPayment = ({ open, handleOpen, id }) => {
  const dispatch = useDispatch();
  const { payment } = useSelector((state) => state["user"]);
  useEffect(() => {
    dispatch(getPaymentDetails({ id: id }));
  });
  return (
    <div>
      <Dialog open={open} handler={handleOpen}>
        {JSON.stringify(payment)}
      </Dialog>
    </div>
  );
};

export default EditPayment;
