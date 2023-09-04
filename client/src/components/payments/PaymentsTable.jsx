/* eslint-disable react/prop-types */
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Card, Typography } from "@material-tailwind/react";
import { formatDate, formatIndianNumber } from "../../utils/format";
import { useDispatch } from "react-redux";
import { deletePayment, setPayment } from "../../redux/userSlice";
import { useState } from "react";
import EditPayment from "./EditPayment";
const TABLE_HEAD = [
  "Payment Id",
  "Client Name",
  "Amount",
  "Mode",
  "Date",
  "Action",
];

const PaymentsTable = ({ data, clientName }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <Card className="overflow-auto shadow-none mt-5">
        {data?.length > 0 ? (
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="border-y  bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      className="text-black font-medium leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(({ _id,id, amount, mode, client, date }, index) => {
                const isLast = index === data?.length - 1;
                const classes = isLast
                  ? "p-3 text-black"
                  : "p-3 border-b border-blue-gray-50 text-black";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {client?.name || clientName}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {formatIndianNumber(amount)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {mode}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" className="font-normal">
                        {formatDate(date)}
                      </Typography>
                    </td>
                    <td
                      className={`flex items-center  p-3 text-black gap-4 ${classes}`}
                    >
                      <TrashIcon
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                        onClick={() => dispatch(deletePayment({ id: _id }))}
                      />

                      <PencilSquareIcon
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          setPaymentId(_id);
                          dispatch(setPayment({ id: _id }));
                          handleOpen();
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-black text-center font-bold border-none ">
            No Payments{" "}
          </p>
        )}
        {paymentId && (
          <EditPayment open={open} handleOpen={handleOpen} id={paymentId} />
        )}
      </Card>
    </>
  );
};

export default PaymentsTable;
