import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
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
import PaymentsTable from "./PaymentsTable";
import { searchPayments } from "../../utils/serach";
import { getAllPayments } from "../../redux/userSlice";
import {Link} from "react-router-dom"
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
    <div className="p-4 md:px-10">
      <Card className="h-full w-full shadow-none">
        <CardHeader floated={false} shadow={false} className="rounded-none">
        <Link to="/" className="flex items-center cursor-pointer mb-5 gap-2 shadow-md w-fit p-2 rounded-md bg-gray-200">
            <ArrowLeftIcon className="h-6 w-6" />
            <p>Back to Home</p>
          </Link>
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
