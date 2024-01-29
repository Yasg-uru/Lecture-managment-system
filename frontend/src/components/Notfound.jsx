import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center bg-slate-900">
      <p className=" text-white ">
        <span className=" text-yellow-500 text-3xl ">403 Forbidden</span>{" "}
        Unauthorized Access
      </p>

      <button
        className=" h-11 w-32  border-teal-500 border-2 rotate-[45deg] text-white"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
    </div>
  );
}
export default Notfound;
