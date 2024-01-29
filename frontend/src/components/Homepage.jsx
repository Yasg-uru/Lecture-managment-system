import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const role=useSelector((state)=>state.auth.role);
  return (
    <Fragment>
      <div className="h-[100vh] w-[100vw] grid grid-cols-2 bg-slate-900 p-4">
        <div className="h-[90vh] w-full flex flex-col justify-center items-center border-black">
          <h1 className="text-5xl underline underline-offset-8 text-yellow-500">
            Upscaling made with Lakshya academy
          </h1>
          <p className="text-white mt-6 text-wrap">
            Lakshya academy is your one-stop-shop for upscaling. Get maximum
            value for time and resources you invest, with job-ready courses &
            high-technology, available at the lowest cost.
          </p>
         <div className="flex gap-2">
         <button
            onClick={() => {
              navigate("/getcourses");
            }}
            className=" bg-yellow-500 text-white text-2xl font-bold h-[50px] w-[250px] relative left-0 top-5 rounded-lg hover:bg-yellow-800"
          >
            Explore Courses
          </button>
          {
            role? <button
            onClick={() => {
              navigate("/create/course");
            }}
            className=" bg-yellow-500 text-white text-2xl font-bold h-[50px] w-[250px] relative left-0 top-5 rounded-lg hover:bg-yellow-800"
          >
         create course
          </button>:null
          }
         </div>
        </div>
        <div>
            <img src="https://thumbs.dreamstime.com/z/coaching-mentoring-skills-concept-d-diagram-36438038.jpg" alt="" />
        </div>
      </div>
    </Fragment>
  );
}
export default Homepage;
