import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClient } from "../../redux/userSlice";
import Loading from "../Loading";
import { Button } from "@material-tailwind/react";
import AddPayment from "./AddPayment";
import PaymentsTable from "./PaymentsTable";
const ClientPayments = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { id } = useParams();
  const { isLoading, client } = useSelector((state) => state["user"]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClient({ id: id }));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-lg">Client ID : {id}</p>
        <p className="text-lg">Client Name : {client?.name}</p>
        <p className="text-lg">Client Contact : {client?.contact}</p>
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
          onClick={handleOpen}
        >
          Add Payment
        </Button>
      </div>
      <PaymentsTable data={client?.payments} clientName={client?.name} />
      <AddPayment open={open} handleOpen={handleOpen} />
    </div>
  );
};

export default ClientPayments;
