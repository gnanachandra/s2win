/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";

const RequireAuth = () => {
  const { token } = useSelector((store) => store["user"]);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    <Navigate to={"/login"} replace />;
    window.location.reload();
  };

  return (
    <div>
      <section className="pt-5">
        <div className="flex flex-col p-4 md:p-10">
          <Button
            className="bg-red-600  place-self-end w-fit capitalize rouned-sm hover:shadow-deep-orange-500 hover:shadow-sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        {token ? <Outlet /> : <Navigate to={"/login"} replace />}
      </section>
    </div>
  );
};
export default RequireAuth;
