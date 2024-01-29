import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { editprofile, getdata,deleteuser, logout } from "../../Redux/Slices/authSlice";

import { useNavigate } from "react-router-dom";

const Myprofile = () => {
  const dispatch = useDispatch();
const navigate=useNavigate();
  const Profile = useSelector((state) => state.auth.profile);
  const Name = useSelector((state) => state.auth.name);
  const Email = useSelector((state) => state.auth.email);
  const Role = useSelector((state) => state.auth.role);
    
  const [previewimage, setpreviewimage] = useState("");

  const [formdata, setformdata] = useState({
    name: Name,
    email: Email,

    profile:Profile 
  });
  const handlesubmitform = async (event) => {
    event.preventDefault();
    
    await dispatch(editprofile(formdata));
    dispatch(getdata());
   
  };
const handledelete=async()=>{
    console.log("delete function is called")
    await dispatch(deleteuser());
    dispatch(logout());
    navigate('/register')

}
  const handlechangeimage = (event) => {
    event.preventDefault();
    const uploadimage = event.target.files[0];
    if (uploadimage) {
      setformdata({
        ...formdata,
        profile: uploadimage,
      });
    }
    const filereader = new FileReader();
    filereader.readAsDataURL(uploadimage);
    filereader.addEventListener("load", function () {
      setpreviewimage(this.result);
    });
  };
  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  return (
    <div className="h-[100vh] w-full bg-white flex flex-col justify-center items-center">
      <form
        onSubmit={handlesubmitform}
        className="shadow-[0_0_10px_black] h-[60vh] w-[80vw] border-1 border-white rounded-lg p-4 gap-5 flex flex-col "
      >
        <div className="h-[20vh] border-2  w-full flex justify-between p-4">
          {/* <img
            className="h-24 w-24 rounded-full "
            src={
              "https://th.bing.com/th/id/OIP.-puymjZbrwsu8LEduXeIVQHaLH?rs=1&pid=ImgDetMain"
            }
            alt=""
          /> */}
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewimage ? (
              <img
                className="h-24 w-24 rounded-full mx-auto"
                src={previewimage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className=" h-24 w-24 rounded-full mx-auto text-black" />
            )}
          </label>
          <input
            onChange={handlechangeimage}
            className="hidden"
           
            type="file"
            id="image_uploads"
            name="profile"
          />
          <div className="flex items-center cursor-pointer" onClick={handledelete}>
            {" "}
            <RiDeleteBinLine color="red" size={18} />{" "}
            <span className="text-red-500 !important">Delete Account</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mx-auto">
          <input
            className="h-[6vh] w-[35vw] border-2 border-slate-950 rounded-sm text-black text-xl"
            placeholder="Name"
            name="name"
            value={formdata.name}
            onChange={handlechange}
          ></input>
          <input
            className="h-[6vh] w-[35vw] border-2 border-slate-950 rounded-sm text-black text-xl"
            placeholder="Email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
          ></input>
          {/* <input
            className="h-[6vh] w-[35vw] border-2 border-slate-950 rounded-sm text-black text-xl"
            placeholder="role"
            value={formdata.profile}
            onChange={handlechange}
          ></input>
          <input
            className="h-[6vh] w-[35vw] border-2 border-slate-950 rounded-sm text-black text-xl"
            placeholder="role"
            onChange={handlechange}
          ></input> */}
          <button className="w-full h-10 bg-orange-600 col-span-2 rounded-md text-white text-xl font-bold hover:bg-orange-300  ">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Myprofile;
