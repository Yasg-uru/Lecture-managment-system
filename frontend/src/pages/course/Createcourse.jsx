import { useState } from "react";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { createcourse, getallcourse } from "../../Redux/Slices/courseSlice";

function Createcourse() {
  const dispatch = useDispatch();

  const [formdata, setformdata] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    createdby: "",
    thumbnail: "",
  });

  const handlesubmitform = async (event) => {
    event.preventDefault();
    await dispatch(createcourse(formdata));
    dispatch(getallcourse());

    setformdata({
      title: "",
      description: "",
      category: "",
      price: 0,
      createdby: "",
      thumbnail: "",
    });
  };

  const [previewimage, setpreviewimage] = useState("");
  const handlechange = (event) => {
    const { name, value } = event.target;
    setformdata({
      ...formdata,
      [name]: value,
    });
  };
  const getimage = (event) => {
    event.preventDefault();
    const uploadimage = event.target.files[0];
    if (uploadimage) {
      setformdata({
        ...formdata,
        thumbnail: uploadimage,
      });
      const filereader = new FileReader();
      filereader.readAsDataURL(uploadimage);
      filereader.addEventListener("load", function () {
        setpreviewimage(this.result);
      });
    }
  };
  return (
    <Fragment>
      <div className=" h-[100vh] w-[100vw] bg-slate-900 flex flex-col justify-center items-center">
        <form
          onSubmit={handlesubmitform}
          className="border-2 border-white h-[95vh] w-[40vw] shadow-[0_0_10px_black] rounded-md p-3 gap-2 flex flex-col "
        >
          <label className="cursor-pointer">
            {previewimage ? (
              <img
                className=" h-32 w-36 mx-auto"
                src={previewimage}
                alt="preview image"
              ></img>
            ) : (
              <img
                className="h-32 w-36 mx-auto"
                src="https://freesvg.org/img/Simple-Image-Not-Found-Icon.png"
                alt="image not found"
              />
            )}
            <input
              onChange={getimage}
              className="hidden"
              // value={formdata.profile}
              type="file"
              id="image_uploads"
              name="profile"
            />{" "}
          </label>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="title" className="text-white font-bold text-xl">
              Title
            </label>
            <input
              className="text-white text-xl bg-slate-900 border-2 border-white"
              type="text"
              placeholder="Enter title"
              name="title"
              value={formdata.title}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="category" className="text-white font-bold text-xl">
              Category
            </label>
            <input
              className="text-white text-xl bg-slate-900 border-2 border-white"
              type="text"
              placeholder="Enter category"
              name="category"
              value={formdata.category}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="price" className="text-white font-bold text-xl">
              Price
            </label>
            <input
              className="text-white text-xl bg-slate-900 border-2 border-white"
              type="number"
              placeholder="Enter price"
              name="price"
              value={formdata.price}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label htmlFor="createdby" className="text-white font-bold text-xl">
              created by
            </label>
            <input
              className="text-white text-xl bg-slate-900 border-2 border-white"
              type="text"
              placeholder="Enter name"
              name="createdby"
              value={formdata.createdby}
              onChange={handlechange}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <label
              htmlFor="description"
              className="text-white font-bold text-xl"
            >
              Description
            </label>
            <input
              className="text-white text-xl bg-slate-900 border-2 border-white"
              type="text"
              placeholder="Enter description"
              name="description"
              value={formdata.description}
              onChange={handlechange}
            />
          </div>
          <button
            type="submit"
            className="text-white font-bold text-xl bg-yellow-500 py-2 mt-3 shadow-lg rounded-lg hover:bg-yellow-700 "
          >
            Create course
          </button>
        </form>
      </div>
    </Fragment>
  );
}
export default Createcourse;
