import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdTrash } from "react-icons/io";
import { deletecourse, getallcourse } from "../Redux/Slices/courseSlice";
import { IoMdAdd } from "react-icons/io";
function Coursecard({ title, price, image, id }) {
  const userrole = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const subscriptionstatus = useSelector(
    (state) => state.auth.subscriptionstatus
  );
  return (
    <div className="flex flex-col items-center gap-2 mt-6 mx-auto h-[50vh] w-[27vw] bg-slate-900  p-1   shadow-[0_0_10px_black] ">
      <h1 className="text-xl text-yellow-500 text-center">{title}</h1>
      <img className=" h-32 w-full" src={image} alt="image not found" />
      <div className="flex ">
        <span className="text-yellow-500 font-bold text-2xl">
          {" "}
          &#8377;{price}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1 w-full  h-[10vh] ">
        <button
          className="h-full w-full border-1 bg-slate-900 border-white shadow-[0_0_400px_black] text-yellow-500 text-xl border-[0.5px] rounded-lg "
          onClick={() => {
            navigate(`/explore/${id}`);
          }}
        >
          Explore
        </button>
        {!subscriptionstatus ? (
          <button
            onClick={() => {
              navigate("/subscribe");
            }}
            className="h-full w-full border-1 bg-slate-900 border-white shadow-[0_0_400px_black] text-yellow-500 text-xl border-[0.5px] rounded-lg "
          >
            Subscribe
          </button>
        ) : (
          <button
            onClick={() => {
              navigate(`/watchlecture/${id}`);
            }}
            className="h-full w-full border-1 bg-slate-900 border-white shadow-[0_0_400px_black] text-yellow-500 text-xl border-[0.5px] rounded-lg "
          >
            Watch
          </button>
        )}
      </div>
      {userrole == "admin" ? (
        <div className="flex items-center">
          <span className="cursor-pointer">
            <IoMdTrash
              size={24}
              color="red"
              onClick={async () => {
                await dispatch(deletecourse(id));
                dispatch(getallcourse());
              }}
            />
          </span>
          <span
            className=" cursor-pointer  italic "
            onClick={() => {
              navigate(`/addlecture/${id}`);
            }}
          >
            {" "}
            <IoMdAdd size={25} color="red" />
          </span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Coursecard;
