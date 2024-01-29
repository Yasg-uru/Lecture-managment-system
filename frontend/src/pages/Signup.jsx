import { useState } from "react";
import toast from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createAccount } from "../Redux/Slices/authSlice.js";
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewimage, setpreviewimage] = useState("");
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });
  function handlechange(e) {
    const { name, value } = e.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  }
  function getimage(e) {
    e.preventDefault();
    let uploadimage = e.target.files[0];
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
  }
  const createnewaccount = async (event) => {
    event.preventDefault();
    //checking the empty fields
    if (
      !formdata.profile ||
      !formdata.email ||
      !formdata.password ||
      !formdata.profile
    ) {
      toast.error("please fill all the fields");
    }
    if (
      !formdata.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      toast.error("please enter valid email");
    }
    if (!formdata.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
      toast.error("please enter valid password");
    }
    const Formdata = new FormData();
    Formdata.append("name", formdata.name);
    Formdata.append("email", formdata.email);
    Formdata.append("password", formdata.password);
    Formdata.append("profile", formdata.profile);
    const res = await dispatch(createAccount(Formdata));
    setformdata({
      name: "",
      emaila: "",
      password: "",
      profile: "",
    });
    setpreviewimage("");
    navigate("/");
  };
  return (
    <>
      <div className=" flex justify-center items-center h-[100vh] w-[100vw] bg-slate-900 ">
        <form
          onSubmit={createnewaccount}
          className="flex flex-col justify-center gap-4 p-2 w-96 shadow-2xl rounded-sm h-[90vh] border border-teal-50"
        >
          <h1 className=" text-center text-3xl font-bold text-teal-500 underline underline-offset-4">
            Registration Page
          </h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewimage ? (
              <img
                className="h-24 w-24 rounded-full mx-auto"
                src={previewimage}
                alt="preview image"
              />
            ) : (
              <BsPersonCircle className=" h-24 w-24 rounded-full mx-auto text-white" />
            )}
          </label>
          <input
            onChange={getimage}
            className="hidden"
            // value={formdata.profile}
            type="file"
            id="image_uploads"
            name="profile"
          />

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-white">Name</label>
            <input
              required
              type="text"
              name="name"
              className="bg-black text-white"
              value={formdata.name}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-white">Email</label>
            <input
              required
              type="email"
              name="email"
              className="bg-black text-white"
              value={formdata.email}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-white">password</label>
            <input
              required
              type="password"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              className="bg-black text-white"
            />
          </div>
          <button type="submit" className="bg-teal-500 w-full p-2">
            submit
          </button>
          <p className="text-center text-white" >Already have an account <span className=" text-cyan-400"><Link to="/login" > Login</Link></span></p> 
          
        </form>
      </div>
    </>
  );
}
export default Signup;
