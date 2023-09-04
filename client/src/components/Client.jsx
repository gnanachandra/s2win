import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getClient, setBranch } from "../redux/userSlice";
import Loading from "./Loading";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import AddBranch from "./AddBranch";
import {
  TrashIcon,
  PencilSquareIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import DeleteBranchDialog from "./dialogs/DeleteBranchDialog";
import { toast } from "react-hot-toast";
import EditBranch from "./EditBranch";
const TABLE_HEAD = [
  "Branch Code",
  "Branch Name",
  "Contact",
  "Strength",
  "Login ID",
  "Password",
  "Login",
  "Action",
];
const Client = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  const [openWarning, setOpenWarning] = useState(false);
  const handleOpenWarning = () => setOpenWarning(!openWarning);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(!openEdit);

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
      <Link
        to="/"
        className="flex items-center cursor-pointer mb-5 gap-2 shadow-md w-fit p-2 rounded-md bg-gray-200"
      >
        <ArrowLeftIcon className="h-6 w-6" />
        <p>Back to Home</p>
      </Link>
      <div className="flex flex-col gap-2">
        <p className="text-lg">Client ID : {client?.clientId}</p>
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
      <Card className="h-full w-full overflow-x-scroll lg:overflow-auto mt-6 ">
        <CardBody className="m-0 p-0 ">
          {
            <table className="w-full min-w-max table-auto text-left  overflow-auto">
              <thead>
                <tr className="">
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
                  ({
                    _id,
                    branchCode,
                    name,
                    contact,
                    branchStrength,
                    loginID,
                    password,
                  }) => (
                    <tr key={_id} className="even:bg-blue-gray-50/50">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {branchCode || "NA"}
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
                        <input
                          type="button"
                          value="Login"
                          className="bg-deep-orange-500 text-white font-bold p-1.5 hover:shadow-sm rounded-md cursor-pointer"
                        />
                      </td>
                      <td className="p-4 flex gap-4 items-center">
                        <TrashIcon
                          className="h-6 w-6 text-red-500 cursor-pointer hover:text-red-800"
                          onClick={() => {
                            setBranchName(name),
                              setBranchId(_id),
                              handleOpenWarning();
                          }}
                        />
                        <PencilSquareIcon
                          className="h-6 w-6 cursor-pointer"
                          onClick={() => {
                            dispatch(setBranch({ id: _id }));
                            handleOpenEdit();
                          }}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          }
        </CardBody>
      </Card>
      <AddBranch open={open} handleOpen={handleOpen} />
      <DeleteBranchDialog
        open={openWarning}
        handleOpen={handleOpenWarning}
        branchName={branchName}
        id={branchId}
      />

      <EditBranch open={openEdit} handleOpen={handleOpenEdit} />
    </div>
  );
};

export default Client;
