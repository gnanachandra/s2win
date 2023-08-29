import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import PaymentsTable from "./PaymentsTable"
import { searchPayments } from "../../utils/serach";
import { getAllPayments } from "../../redux/userSlice";

const Payments = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPayments());
  }, []);

  const { isLoading, payments } = useSelector((state) => state["user"]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="p-4 md:p-10">
      <Card className="h-full w-full shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none p-2">
          <div className="flex w-full flex-col md:flex-row items-center justify-between shrink-0 gap-2 md:w-full md:justify-between  mt-5 md:mt-0">
            <Typography variant="h5" className="flex gap-2 text-black">
              All Payments
            </Typography>
            <div className="w-full md:w-72">
              <Input
                placeholder="id,client Name,Date"
                variant="static"
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardBody className="p-0 mx-0">
          <PaymentsTable data={searchPayments(query, payments)} />
        </CardBody>
      </Card>
    </div>
  );
};

export default Payments;
