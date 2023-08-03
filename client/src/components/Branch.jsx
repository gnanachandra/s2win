import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getBranch } from "../redux/userSlice";
import Loading from "./Loading";
import { Button, Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Payment ID", "Amount", "Payment Mode", "Date"];

const Branch = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const { id } = useParams();
  const { isLoading, branch } = useSelector((state) => state["user"]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBranch({ id: id }));
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col gap-2">
        <p className="text-lg">Branch ID : {id}</p>
        <p className="text-lg">Branch Name : {branch?.name}</p>
        <p className="text-lg">Branch Contact : {branch?.contact}</p>
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
          onClick={handleOpen}
        >
          Add Payment
        </Button>
      </div>
      <Card className="h-full w-full overflow-x-scroll lg:overflow-hidden rounded-none mt-10 shadow-none">
        {
          <table className="w-full min-w-max table-auto text-left border border-gray-700 mt-5 overflow-auto">
            <thead>
              <tr className="border border-gray-900">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      className="text-black font-bold text-lg leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branch?.payments?.map(({ _id, amount, mode, date }, index) => (
                <tr key={_id} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {(_id && _id.substring(0, 6)) || "N/A"}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {amount.toLocaleString()}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {mode}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {date}
                    </Typography>
                  </td>
                  
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        }
      </Card>
    </div>
  );
};

export default Branch;
