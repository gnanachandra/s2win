/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getClients } from "../redux/userSlice";
import { Button, Card, Typography } from "@material-tailwind/react";
import AddClient from "./AddClient";
import { Link } from "react-router-dom";

const TABLE_HEAD = [
  "Client ID",
  "Client Name",
  "Contact",
  "URL",
  "Has Branches",
  "Action",
];
const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
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
        <h1 className="text-gray-700 text-center font-bold text-lg">
          Clients Details
        </h1>
        <div className="flex justify-end">
          <Button
            className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
            onClick={handleOpen}
          >
            Add client
          </Button>
        </div>
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
            {clients?.map(({ _id, name, contact, url, hasBranches }, index) => (
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
                    className="font-medium"
                  >
                    {hasBranches}
                  </Typography>
                </td>
                {hasBranches === "yes" ? (
                  <td className="p-4">
                    <Link to={`/clients/${_id}`}>
                      <Button className="w-fit">View Branches</Button>
                    </Link>
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
            ))}
          </tbody>
        </table>
      </div>
      <AddClient open={open} handleOpen={handleOpen} />
    </>
  );
};

export default Home;

