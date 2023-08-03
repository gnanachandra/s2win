import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getClient } from "../redux/userSlice";
import Loading from "./Loading";
import { Button, Card, Typography } from "@material-tailwind/react";
import AddBranch from "./AddBranch";
import { TrashIcon } from "@heroicons/react/24/solid";
import DeleteBranchDialog from "./dialogs/DeleteBranchDialog";
const TABLE_HEAD = [
  "Branch ID",
  "Branch Name",
  "Contact",
  "Strength",
  "Login ID",
  "Password",
  "Per Student Amount",
  "Amount",
  "Amount Paid",
  "Payments",
  "Action",
];
const Client = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [openWarning, setOpenWarning] = useState(false);
  const handleOpenWarning = () => setOpenWarning(!openWarning);

  const { id } = useParams();
  const { isLoading, client } = useSelector((state) => state["user"]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClient({ id: id }));
  }, []);

  //branch name and id to show the warning
  const [branchName, setBranchName] = useState("");
  const [branchId, setBranchId] = useState("");
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
      <div className="flex justify-end mt-4">
        <Button
          className="bg-deep-orange-600 capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
          onClick={handleOpen}
        >
          Add Branch
        </Button>
      </div>
      <Card className="h-full w-full overflow-x-scroll lg:overflow-hidden rounded-none shadow-none">
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
              {client?.branches?.map(
                (
                  {
                    _id,
                    name,
                    contact,
                    branchStrength,
                    loginID,
                    password,
                    perStudentAmount,
                    amountPaid,
                    amount,
                  },
                  index
                ) => (
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
                        {branchStrength}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {loginID}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {password}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {perStudentAmount.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {amount.toLocaleString()}
                      </Typography>
                    </td>

                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-medium"
                      >
                        {amountPaid.toLocaleString()}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Link to={`/branches/${_id}`}>
                        <Button>View</Button>
                      </Link>
                    </td>
                    <td className="p-4">
                      <TrashIcon
                        className="h-8 w-8 text-red-500 cursor-pointer hover:text-red-800"
                        onClick={() => {
                          setBranchName(name),
                            setBranchId(_id),
                            handleOpenWarning();
                        }}
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        }
      </Card>
      <AddBranch open={open} handleOpen={handleOpen} />
      <DeleteBranchDialog
        open={openWarning}
        handleOpen={handleOpenWarning}
        branchName={branchName}
        id={branchId}
      />
    </div>
  );
};

export default Client;
