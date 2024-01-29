import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updatepassword } from "../../Redux/Slices/authSlice";

const Updatepassword = () => {
    const dispatch=useDispatch();

  const [formdata, setformdata] = useState({
    
    newpassword: "",
    confirmpassword: "",
  });
  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const handlesubmit=async(event)=>{
    event.preventDefault();
    await dispatch(updatepassword(formdata));

  }
  return (
    <div className="h-[100vh] bg-slate-900 w-full flex flex-col gap-2 justify-center items-center ">
      <form onSubmit={handlesubmit} className=" text-white h-[70vh] w-[40vw] bg-slate-900 flex flex-col gap-2 shadow-[0_0_10px_black] p-2">
        <h1 className="text-white font-bold text-center text-3xl underline underline-offset-4 mb-6">
          Reset Password
        </h1>
       
        <div className="flex flex-col gap-1 ">
          <label className="text-white text-lg " htmlFor="oldpassword">
            Newpassword
          </label>
          <input
            type="password"
            className="bg-slate-900 text-white  border-2 border-white"
            name="newpassword"
            value={formdata.newpassword}
            onChange={handlechange}
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <label className="text-white text-lg " htmlFor="oldpassword">
            Confirmpassword
          </label>
          <input
            type="password"
            className="bg-slate-900 text-white  border-2 border-white"
            name="confirmpassword"
            value={formdata.confirmpassword}
            onChange={handlechange}
          />
        </div>
        <button className="text-white font-bold text-xl  border-1 bg-yellow-500 py-2 mt-6 rounded-lg hover:bg-yellow-950">Reset password</button>
      </form>
    </div>
  );
};

export default Updatepassword;
