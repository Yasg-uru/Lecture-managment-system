import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoIosCloudUpload } from "react-icons/io";
import { addlectures } from "../../Redux/Slices/lectureSlice.js";
function Addlecture() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {id}=useParams();
  console.log("this is id from the uselocation hoook"+id)
  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    lecture: "",
    id:id
    
  });

  const setlecture = (event) => {
    const file = event.target.files[0];
    if (!file) {
      toast.error("please select file");
    } else {
      setformdata({
        ...formdata,
        lecture: file,
      });
    }
  };
  const handlechangeinputs = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const submitform = async (event) => {
    event.preventDefault();

    dispatch(addlectures(formdata));
  };

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-slate-900 flex justify-center items-center ">
        <form
          onSubmit={submitform}
          className="h-[60vh] w-[50vw]  shadow-[0_0_20px_black] flex flex-col gap-2 p-2"
        >
          <span className="text-white flex items-center cursor-pointer">
            <IoMdArrowRoundBack
              size={20}
              color="white"
              onClick={() => {
                navigate(-1);
              }}
            />
            back
          </span>
          <h1 className="text-yellow-500 text-2xl font-bold text-center">
            Add lecture
          </h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-white text-xl ">
              Title
            </label>
            <input
              className="bg-transparent text-white border-2 border-white rounded-sm"
              type="text"
              placeholder="Enter title"
              name="title"
              value={formdata.title}
              onChange={handlechangeinputs}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-white text-xl ">
              Description
            </label>
            <input
              className="bg-transparent text-white border-2 border-white rounded-sm"
              type="text"
              placeholder="Enter description"
              name="description"
              value={formdata.description}
              onChange={handlechangeinputs}
            />
          </div>
          <div className="flex flex-col">
            {/* Visible label to trigger file input */}
            <label
              htmlFor="lecture"
              className="text-white text-xl cursor-pointer"
            >
              Upload file
              <IoIosCloudUpload size={35} color="white" />
            </label>

            {/* Hidden file input */}
            <input
              type="file"
              className="hidden"
              id="lecture"
              name="lecture"
              onChange={setlecture}
            />
          </div>

          <button
            type="submit"
            className="text-white font-bold bg-yellow-500 w-full py-1 shadow-[0_0_20px_black] rounded-lg hover:bg-yellow-900 "
          >
            Upload Lecture
          </button>
        </form>
      </div>
    </>
  );
}
export default Addlecture;
