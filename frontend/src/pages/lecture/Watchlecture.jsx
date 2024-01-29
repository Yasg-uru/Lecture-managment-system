import { useEffect, useState } from "react";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { IoInfiniteSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getlectures } from "../../Redux/Slices/lectureSlice";
import ReactPlayer from 'react-player';
function Watchlecture() {
  const dispatch = useDispatch();

  // const {id}=useParams();
  const { courseid } = useParams();
  useEffect(() => {
    (() => {
      dispatch(getlectures(courseid));
    })();
  }, []);
  const lectures = useSelector((state) => state.lecture.lectures);

  const [isvisible, setisvisible] = useState(false);
  const [index, setindex] = useState(null);
  const handelexpanded = (index) => {
    setindex(index);
    !isvisible ? setisvisible(true) : setisvisible(false);
  };
  const [currentindex, setcurrentindex] = useState(0);
  const handleassignmentclick = (url) => {
    window.open(url, "_blank");
  };
  const navigate = useNavigate();
  const vediostr= lectures && lectures[currentindex]?.lecture?.secure_url
  console.log("this is a vedio str :"+vediostr)
console.log("this is a current index:"+  lectures[currentindex]?.lecture?.secure_url)
  return (
    <div className="b h-[100vh] w-[100vw] bg-white grid grid-cols-2">
      <div className="grid grid-flow-row ">
    
            <ReactPlayer
        url={vediostr}
        controls // Optional: Show video controls (play, pause, volume, etc.)
        width="600"
        height="400"
      />
        <div className="h-[40vh] w-full border-2  m-1">
          <div className="h-[7vh] w-full bg-[#FAEFFA] flex justify-around items-center  ">
            <span className=" cursor-pointer  italic ">overview</span>
            <span className=" cursor-pointer  italic ">Resources</span>
            <span className=" cursor-pointer  italic ">Notes</span>
            <span className=" cursor-pointer  italic ">Doubts</span>
            <span className=" cursor-pointer  italic ">Feedback</span>
          </div>
        </div>
      </div>
      <div className=" grid grid-flow-row  p-4  overflow-auto ">
        {lectures.map((item, i) => (
          <div
            key={i}
            className="h-[20vh] w-full border-2 rounded-lg p-11 overflow-auto"
          >
            <div
              className="flex justify-between cursor-pointer font-bold text-2xl "
              onClick={() => setcurrentindex(i)}
            >
              <span>{i + 1}</span> <span>{item.title}</span>{" "}
              {!isvisible && index === i ? (
                <IoIosArrowDropup
                  size={25}
                  onClick={() => {
                    handelexpanded(i);
                  }}
                />
              ) : (
                <IoIosArrowDropdown
                  size={25}
                  onClick={() => {
                    handelexpanded(i);
                  }}
                />
              )}
            </div>
            {i === index &&
              isvisible &&
              item.assignment.map((it, j) => (
                <div className="h-[10vh] w-full rounded-sm flex gap-3 justify-center ">
                  <p
                    onClick={() => handleassignmentclick(it.secure_url)}
                    className="w-full flex justify-center cursor-pointer"
                  >
                    <IoInfiniteSharp size={25} /> {it.title}
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Watchlecture;
