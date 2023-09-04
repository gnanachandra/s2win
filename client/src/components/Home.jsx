/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { getClients } from "../redux/userSlice";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";
import AddClient from "./AddClient";
import DeleteClientDialog from "./dialogs/DeleteClientDialog";
import ClientsTable from "./ClientsTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchClients } from "../utils/serach";
import calculateTotals from "../utils/count";
import { formatIndianNumber } from "../utils/format";

const Home = () => {
  const [openAddClient, setAddClientOpen] = React.useState(false);
  const handleOpenAddClient = () => setAddClientOpen(!openAddClient);
  const { isLoading, clients } = useSelector((state) => state["user"]);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const data = calculateTotals(clients);
  useEffect(() => {
    dispatch(getClients());
  }, []);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="p-4 md:px-10">
        <div className="flex items-center justify-between mt-2">
          <h1 className="text-black text-center font-bold text-lg lg:text-xl">
            Clients Details
          </h1>
          <Button
            className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
            onClick={handleOpenAddClient}
          >
            Add client
          </Button>
        </div>
        <div className="w-full md:w-72 mt-5">
          <Input
            placeholder="Client ID, Name"
            variant="static"
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2 lg:flex-row justify-between mt-6">
          <p className="font-semibold">
            Total Students : {data["totalStrength"]}{" "}
          </p>
          <p className="font-semibold">
            Total Amount :{" "}
            {formatIndianNumber(data["allClientsAmount"]).toLocaleString()}
          </p>
          <p className="font-semibold">
            Amount Paid :{" "}
            {formatIndianNumber(data["amountPaid"]).toLocaleString()}
          </p>
        </div>
        <Card className="mt-6">
          <CardBody className="p-0 mx-0">
            <ClientsTable data={searchClients(query, clients)} />
          </CardBody>
        </Card>
      </div>
      <AddClient open={openAddClient} handleOpen={handleOpenAddClient} />
    </>
  );
};

export default Home;
