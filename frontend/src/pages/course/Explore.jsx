import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getallcourse } from "../../Redux/Slices/courseSlice";

function Explore() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector((state) => state.course.coursedata);
  // so in received the array of the data
  const newarray = data.find((item) => {
    return item._id == id;
  });
  const newobject = { ...newarray };

  console.log("data is of the particular id is " + newarray);
  return (
    <div className="h-[100vh] w-full bg-slate-900 grid grid-rows-3 gap-2 ">
      <div className=" h-[70vh] w-full grid grid-cols-2 gap-2 mt-14">
        <div className="flex flex-col p-2  gap-4">
          <h1 className=" text-center text-white text-2xl font-bold">
            {newobject?.title}
          </h1>
          <p className="text-white text-xl text-center mt-2">
            {newobject?.description}
          </p>
          <div className=" mt-11 flex items-center">
            <p className=" text-3xl text-yellow-500 font-bold">
              &#8377; {newobject?.price}
            </p>
          </div>
          <div className="grid grid-cols-2 ">
            <button className="h-[7vh] w-[14vw] border-2 rounded-lg border-yellow-500 m-0 text-yellow-500 text-xl font-bold">
              Enroll Now
            </button>
            <button className="h-[7vh] w-[14vw] border-2 rounded-lg border-yellow-500 m-0 text-yellow-500 text-xl font-bold">
              Share
            </button>
          </div>
          <div className=" place-items-end text-white">
            {" "}
            Createdby: <span className="mx-auto ">{newobject.createdby}</span>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <img
            className="h-[25-vh] w-full"
            src={newobject?.thumbnail?.secure_url}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
export default Explore;
