/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import AddClient from "./AddClient";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import DeleteClientDialog from "./dialogs/DeleteClientDialog";
import { setClient } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import EditClient from "./EditClient";
const TABLE_HEAD = [
  "Client ID",
  "Client Name",
  "Contact",
  "URL",
  "Login ID",
  "Password",
  "Branches Count",
  "Total Strength",
  "Payment Type",
  "Amount",
  "Total Amount",
  "Amount Paid",
  "Branches",
  "Payments",
  "Actions",
];
const ClientsTable = ({ data }) => {
  const dispatch = useDispatch();
  const [openWarning, setOpenWarning] = React.useState(false);
  const handleOpenWarning = () => setOpenWarning(!openWarning);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");

  return (
    <>
      <Card className="h-full w-full overflow-x-scroll lg:overflow-auto shadow-none">
        {data.length > 0 ? (
          <table className="w-full min-w-max table-auto text-left ">
            <thead className="break-words text-black">
              <tr className="">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      className="text-black font-bold text-lg"
                      
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.map(
                (
                  {
                    _id,
                    clientId,
                    name,
                    contact,
                    url,
                    loginId,
                    password,
                    branchesCount,
                    totalStrength,
                    paymentType,
                    amount,
                    totalAmount,
                    totalAmountPaid,
                    hasBranches,
                  },
                  index
                ) => (
                  <tr key={name} className="even:bg-blue-gray-50/50 text-black">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {clientId}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {contact}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {hasBranches === "no" ? (
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer underline"
                          >
                            {url}
                          </a>
                        ) : (
                          <p> {url}</p>
                        )}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {loginId}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {password}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {branchesCount}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {totalStrength?.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {paymentType}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {amount?.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {totalAmount?.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {totalAmountPaid.toLocaleString()}
                      </Typography>
                    </td>

                    {hasBranches === "yes" ? (
                      <td className="p-4">
                        <Link to={`/clients/${_id}`}>
                          <Button className="w-fit">View</Button>
                        </Link>
                      </td>
                    ) : (
                      <>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            No Branches
                          </Typography>
                        </td>
                      </>
                    )}
                    <td className="p-4">
                      <Link to={`/payments/${_id}`}>
                        <Button className="bg-green-400 hover:shadow-green-400 hover:shadow-sm">
                          View
                        </Button>
                      </Link>
                    </td>
                    {/* <td className="p-4 ">
                      {hasBranches === "no" ? (
                        <a href={url} target="_blank" rel="noreferrer">
                          <Button className="bg-cyan-700 p-3 hover:shadow-cyan-600 hover:shadow-sm">
                            Login
                          </Button>
                        </a>
                      ) : (
                        <p className="flex items-center justify-center">NA</p>
                      )}
                    </td> */}
                    <td className="py-6 flex gap-4 items-center h-full ">
                      <TrashIcon
                        className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-800 place-items-center ml-4"
                        onClick={() => {
                          setClientName(name),
                            setClientId(_id),
                            handleOpenWarning();
                        }}
                      />
                      <PencilSquareIcon
                        className="h-6 w-6 cursor-pointer"
                        onClick={() => {
                          dispatch(setClient({ id: _id }));
                          handleOpenEdit();
                        }}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : (
          <p className="font-bold text-center text-lg text-black mt-5">
            No records found
          </p>
        )}
      </Card>

      <DeleteClientDialog
        open={openWarning}
        handleOpen={handleOpenWarning}
        clientName={clientName}
        id={clientId}
      />

      <EditClient open={openEdit} handleOpen={handleOpenEdit} />
    </>
  );
};

export default ClientsTable;
