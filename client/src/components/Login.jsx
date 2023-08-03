/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/userSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {

  const dispatch = useDispatch();
  const form = useForm();
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const errorMessages = Object.values(errors);
  if (errorMessages.length !== 0) {
    toast.error(errorMessages[0]?.message);
  }

  const handleLogin = async (data) => {
    const response = await dispatch(userLogin(data));
    if (response.meta.requestStatus === "fulfilled") {

      navigate("/", { replace: true });
    }
  };
  const {token} = useSelector((state)=>state["user"]);
  if(token)
  {
    return <Navigate to="/" replace:true/>
  }
  return (
    <div className="min-h-screen w-screen  flex items-center  justify-center ">
      <div className="p-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm rounded-lg shadow-md bg-[#1c1c1c] text-white">
        <form
          className="flex flex-col gap-5 md:gap-5"
          onSubmit={handleSubmit(handleLogin)}
        >
          
          <p className="text-center font-bold text-xl">
            Sign in to your account
          </p>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Your email</label>
            <input
              type="email"
              name="email"
              className="p-2 border border-black text-black font-semibold text-lg shadow-md rounded-md"
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
              })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="p-2 border border-black text-black font-semibold text-lg shadow-md rounded-md"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
              })}
            />
          </div>
          <div>
            <input
              type="submit"
              value="Log in"
              className="bg-deep-orange-500 p-2 rounded-md text-white font-bold w-full cursor-pointer hover:bg-deep-orange-800"
            />
          </div>
            
        </form>
      </div>
    </div>
  );
};

export default Login;
