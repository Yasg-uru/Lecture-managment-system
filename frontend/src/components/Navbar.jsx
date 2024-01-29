import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/authSlice.js";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
function Navbar() {
  const [dropdown, setdropdown] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const handlemouseenter = () => {
    setdropdown(true);
  };
  const handlemouseleave = () => {
    setdropdown(false);
  };
  return (
    <Fragment>
      <nav className=" bg-black py-4 w-full" onMouseLeave={handlemouseleave}>
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white font-bold text-lg">
            your logo
          </a>
          <div className="flex  space-x-5 text-white font-bold ">
            <Link className="hover:text-cyan-500" to='/home'>
              Home
            </Link>
            <a className="hover:text-cyan-500" href="">
              About
            </a>
            <a className="hover:text-cyan-500" href="">
              Contact us
            </a>
            {!isLoggedIn ? (
              <Link to={"/login"}>
                <button className=" bg-cyan-400 rounded-full w-[100px] outline outline-white-500 outline-offset p-1">
                  sign in
                </button>
              </Link>
            ) : (
              <>
                {/* <button onClick={()=>{
                dispatch(logout());
              }} className=" bg-cyan-400 rounded-full w-[100px] outline outline-white-500 outline-offset p-1">
                Log out
              </button> */}
                <div
                  className="cursor-pointer h-[10px] w-[10px]"
                  onMouseEnter={handlemouseenter}
                  
                >
                {!dropdown  ?  <FaUserCircle size={30} /> : null}
                </div>
                {
                  dropdown && (
                    <div className=" h-[100px] absolute bg-gray-200  w-[100px] right-[1.2vw] rounded-lg flex flex-col items-center cursor-pointer ">
                    <ul>
                      <li className=" text-slate-600 "
                      onClick={()=>{
                        dispatch(logout())
                      }}>
                        logout
                      </li>
                      <li  className=" text-slate-600 ">
                        <Link to={'/myprofile'}>my profile</Link>
                      </li>
                    </ul>


                    </div>
                  )
                }
                
              </>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
export default Navbar;
