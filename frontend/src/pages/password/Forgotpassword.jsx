import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgetPassword } from "../../Redux/Slices/authSlice";
function Forgotpassword() {
  const dispatch = useDispatch();
  const [email, setemail] = useState("");

  const handlesubmitform = async(event) => {
    event.preventDefault();
   dispatch(forgetPassword(email));
  };

  return (
    //now creating the ui of the forgot password
    <div className="flex flex-col justify-center items-center bg-slate-900 h-[100vh] ">
      <form
        onSubmit={handlesubmitform}
        className=" flex flex-col border-2 border-red-700 h-[70vh] w-[40vw] shadow-[0_0_10px_black] gap-2 p-2 "
      >
        <h1 className="text-3xl text-white text-center underline">
          Forgot password{" "}
        </h1>
        <p className="text-white text-lg pt-5 pb-7">
          Enter your registered email, we will send you a verification link on
          your registered email from which you can reset your password
        </p>
        {/* now creating the div for input fields */}
        <div className="flex flex-col gap-1 ">
          <label htmlFor="email" className="text-white text-lg font-bold">
            Email
          </label>
          <input
            className="text-white text-xl bg-slate-900 border-2 border-white rounded-lg"
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <button
          className="mt-7 text-white bg-yellow-500 py-2 hover:bg-yellow-900 font-bold text-lg rounded-lg"
          type="submit"
        >
          Get Verification Link
        </button>
        <p className="text-white text-lg font-bold">
          Already have an Account?{" "}
          <Link to={"/login"}>
            <span className="text-yellow-500 hover:text-red-700">Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
export default Forgotpassword;
