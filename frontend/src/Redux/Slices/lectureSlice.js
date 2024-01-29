import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import { toast } from "react-hot-toast";
import axios from "axios";

const initialState = {
  lectures: [],
};
// const { isauthenicated, authorization } = require('../middleware/auth.middleware.js');
// router.route('/addlecture/:id').post(isauthenicated,authorization('admin'),upload.single('lecture'),createlecture);

// router.route('/deletelecture/:courseid/:lectureid').delete(isauthenicated,authorization('admin'),deletelecture)
// router.route("/getlectures/:id").get(isauthenicated,getlecturesbycourse);
export const getlectures = createAsyncThunk(
  "/lecture/getlecture",
  async (id) => {
    try {
      const res = await axiosInstance.get(`/lecture/getlectures/${id}`);
      // console.log("this is a lectures array ",res.data.lectures)
      toast.success("lecture loaded successfully");
      return res.data;
    } catch (error) {
      toastr.error("lectures failed to load");
    }
  }
);

export const addlectures = createAsyncThunk(
  "/lecture/addlecture",
  async (data) => {
    try {
      const formdata=new FormData();
      formdata.append('title',data.title);
      formdata.append('description',data.description);
      formdata.append('lecture',data.lecture)

      // const res = axiosInstance.post(`/lecture/addlecture/:${id}`, data);
      const res =  axios.post(
        `http://localhost:4000/lecture/addlecture/${data.id}`,
        formdata,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      await toast.promise(res, {
        loading: "....loading",
        success: (data) => {
          return data?.data?.message || "lectures added successfully";
        },
        error: "oops ! failed to add lectures",
      });
      toast.success("lectures added successfully")
      return (await res).data;
    } catch (error) {
      toast.error("failed to add lectures");
    }
  }
);
export const deletelectures = createAsyncThunk("/lecture/delete", async () => {
  try {
    const res = axiosInstance.delete(
      "/lecture/deletelecture/:courseid/:lectureid"
    );
    await toast.promise(res, {
      loading: "...loading",
      success: (data) => {
        return data?.data?.message || "lecture deleted successsfully";
      },
      error: "lecture deletion failed",
    });
    return (await res).data;
  } catch (error) {
    toast.error(error?.response?.message || "lecture deletion failed");
  }
});

const lectureSlice = createSlice({
  name: "lecture",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getlectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.course?.lectures;
      })
      .addCase(addlectures.fulfilled, (state, action) => {
        state.lectures = action?.payload?.lectures;
      });
  },
});
export const {} = lectureSlice.actions;
export default lectureSlice.reducer;
