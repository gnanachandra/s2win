/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getClients } from "../redux/userSlice";
import { Button, Card, Typography } from "@material-tailwind/react";
import AddClient from "./AddClient";
import { Link } from "react-router-dom";
import {TrashIcon} from "@heroicons/react/24/solid"
import DeleteClientDialog from "./dialogs/DeleteClientDialog";

const TABLE_HEAD = [
  "Client ID",
  "Client Name",
  "Contact",
  "URL",
  "Count",
  "Total Strength",
  "Total Amount",
  "Amount Paid",
  "Branches",
];
const Home = () => {
  const [openAddClient, setAddClientOpen] = React.useState(false);
  const handleOpenAddClient = () => setAddClientOpen(!openAddClient);

  const [openWarning,setOpenWarning] = React.useState(false);
  const handleOpenWarning = () => setOpenWarning(!openWarning);

  //to display the client name in the dialog
  const [clientName,setClientName] = useState("")
  const [clientId,setClientId] = useState("");

  const { isLoading, clients } = useSelector((state) => state["user"]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClients());
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className="p-4 md:p-10">
        <h1 className="text-gray-700 text-center font-bold text-lg lg:text-xl">
          Clients Details
        </h1>
        <div className="flex justify-end">
          <Button
            className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
            onClick={handleOpenAddClient}
          >
            Add client
          </Button>
        </div>

        <Card className="h-full w-full overflow-x-scroll lg:overflow-hidden rounded-none mt-10 shadow-none">
          <table className="w-full min-w-max table-auto text-left border border-gray-700 mt-5">
            <thead className="">
              <tr className="border border-gray-900">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    style={{ wordBreak: "break-all" }}
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
              {clients?.map(
                (
                  {
                    _id,
                    name,
                    contact,
                    url,
                    branchesCount,
                    totalStrength,
                    totalAmount,
                    totalAmountPaid,
                    hasBranches,
                  },
                  index
                ) => (
                  <tr key={name} className="even:bg-blue-gray-50/50">
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
                        {url}
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
                        {totalStrength.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {totalAmount.toLocaleString()}
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
                      <td className="p-4 flex items-center gap-4 ">
                        <Link to={`/clients/${_id}`}>
                          <Button className="w-fit">View</Button>
                        </Link>
                        <TrashIcon className="h-8 w-8 text-red-500 cursor-pointer hover:text-red-800" onClick={()=>{setClientName(name),setClientId(_id),handleOpenWarning()}}/>
                      </td>
                    ) : (
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          No Branches
                        </Typography>
                      </td>
                    )}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </Card>
      </div>
      <AddClient open={openAddClient} handleOpen={handleOpenAddClient} />
      <DeleteClientDialog open={openWarning} handleOpen={handleOpenWarning} clientName={clientName} id={clientId}/>
    </>
  );
};

export default Home;
