import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/Slices/authSlice.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const submitform = async (event) => {
    event.preventDefault();
    //now we need to dispatch the login action
    dispatch(login(formdata));
    setformdata({
      email: "",
      password: "",
    });
    navigate("/");
  };
  return (
    <div className="h-[100vh] w-[100vw]  bg-slate-900 flex flex-col items-center justify-center">
      <form
        onSubmit={submitform}
        className="p-4 h-[64vh] w-[40vw] bg-slate-900 shadow-2xl border-2 border-white rounded-lg flex flex-col gap-2"
      >
        <h1 className=" text-white font-bold text-center text-3xl underline underline-offset-4">
          Login Page
        </h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-white text-2xl ">
            Email
          </label>
          <input
            className="text-white bg-slate-900  border-2 border-white rounded-md "
            // required

            type="email"
            name="email"
            placeholder="Enter Email "
            value={formdata.email}
            onChange={handlechange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-white text-2xl ">
            Password
          </label>
          <input
            className="text-white bg-slate-900  border-2 border-white rounded-md "
            // required

            type="password"
            name="password"
            placeholder="Enter password "
            value={formdata.password}
            onChange={handlechange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="submit"
            className=" bg-yellow-500 mt-6 py-2 rounded-lg text-white font-bold text-lg  hover:bg-yellow-700"
          >
            Login
          </button>
            <span className=" text-white font-bold text-sm my-11 hover:text-orange-400">
          <Link to="/forgotpassword">
              forgot password?{" "}  
             </Link>
             {" or "}
            <Link to={'/updatepassword'}>Update password</Link>
            <br />
            <span className="text-white mb-11 ">Do you not have an account ? {"  "}
            <span className=" text-green-400 hover:text-red-600 cursor-pointer"><Link to="/register">Register</Link></span></span></span>
         
        </div>
      </form>
    </div>
  );
}
export default Login;
