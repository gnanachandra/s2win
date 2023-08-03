/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { deleteBranch } from "../../redux/userSlice";
import { useState } from "react";

const DeleteBranchDialog = ({ open, handleOpen, branchName, id }) => {

  const dispatch = useDispatch();
  const handleDelete = async () => {
    const response = await dispatch(deleteBranch({ id: id }));
    handleOpen();
  };

  return (
    <div>
      <Dialog
        open={open}
        handler={handleOpen}
        dismiss={{ outsidePress: false }}
      >
        <DialogHeader className="flex gap-4">
          <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />
          <p>Confirm your Action</p>
        </DialogHeader>
        <DialogBody divider>
          <p className="text-black font-bold">
            if you want to delete the Branch {branchName} click on{" "}
            <span className="bg-green-500 p-2 text-white rounded-md ml-2 text-xs font-semibold">
              CONFIRM
            </span>
          </p>
          <p className="mt-4">
            Deleting this branch will delete all the details and Payments
            related to this branch
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1 focus:outline-none"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DeleteBranchDialog;
