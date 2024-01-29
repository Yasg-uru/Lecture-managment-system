import { useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallcourse, getallcoursebysearchterm } from "../../Redux/Slices/courseSlice";
import Coursecard from "../../components/Coursecard";

import { FaSearch } from "react-icons/fa";
function Displaycourse() {
  const [search, setsearch] = useState("");
  const dispatch = useDispatch();

  useEffect( () => {
 
    dispatch(getallcourse());
    
  }, []);
  const handlesearch = (searchterm) => {
    dispatch(getallcoursebysearchterm(searchterm))
  };
  const courseData = useSelector((state) => state.course.coursedata);

  return (
    <div className="grid grid-cols-3 flex-wrap gap-2   h-[100vh] w-[100vw] bg-slate-900 overflow-auto">
      <div className="col-span-3 h-[10vh] border-2 flex  justify-center items-center border-yellow-600">
        <input
          className=" rounded-lg h-[7vh] w-[40vw] bg-inherit text-white text-xl border-2 border-white"
          type="text"
          placeholder="Search Courses"
          value={search}
          onChange={(e) => {
            setsearch(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            handlesearch(search);
          }}
          className=" mx-2 rounded-lg text-yellow-500 flex h-[7vh] w-[10vw] items-center justify-around border-[0.5px] border-white"
        >
          <FaSearch color="white" size={24} />
          search
        </button>
      </div>
      {courseData && courseData.map((item, i) => (
        <Coursecard
          key={i}
          title={item.title}
          price={item.price}
          image={item.thumbnail.secure_url}
          id={item._id}
        />
      ))}
    </div>
  );
}
export default Displaycourse;
