/* eslint-disable react/prop-types */
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../components/NavBar";

const RequireAuth = () => {
  const { token } = useSelector((store) => store["user"]);
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div>
      <section className="">
        <div className="">
          <NavBar />
        </div>
        {token ? <Outlet /> : <Navigate to={"/login"} replace />}
      </section>
    </div>
  );
};
export default RequireAuth;
