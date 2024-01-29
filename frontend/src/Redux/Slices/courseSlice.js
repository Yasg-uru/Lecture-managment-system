import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../helper/axiosinstance";
import axios from "axios";
const initialState = {
  coursedata: [],
};
export const createcourse = createAsyncThunk("/course/create", async (data) => {
  try {
    const res = axios.post("http://localhost:4000/course/createcourse", data, {
      withCredentials: true, // Include credentials in the request
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.promise(res, {
      loading: ".....Loading",
      success: (data) => {
        return data?.data?.message || "course created successfully";
      },
      error: "course creation failed ",
    });

    // toast.success("course creation successfull");
    return (await res).data;
  } catch (error) {
    console.log("this is a error :" + error);
    toast.error(error?.error?.message || "course creation failed");
  }
});

export const getallcourse = createAsyncThunk("/course/getcourses", async () => {
  try {
    const res = await axiosInstance.get(`/course/getcourses`);
    toast.success("fetched data successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.error?.message || "data fetching failed");
  }
});
export const getallcoursebysearchterm = createAsyncThunk("/course/getcoursesbysearch", async (searchterm) => {
  try {
    const res = await axiosInstance.get(`/course/getcourses?searchterm=${searchterm}`);
    toast.success("fetched data successfully");
    return res.data;
  } catch (error) {
    toast.error(error?.error?.message || "data fetching failed");
  }
});
export const deletecourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res =  axios.delete(`http://localhost:4000/course/delete/${id}`,{
      withCredentials:true
    });
    await toast.promise(res, {
      loading: "....loading",
      success: (data) => {
        return data?.data?.message || "course deleted successfully";
      },
      error: "course deletion failed",
    });
    toast.success("course deleted successfully")
    return res.data;
  } catch (error) {
    toast.error(error?.error?.message || "course deletion failed");
  }
});
const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getallcourse.fulfilled, (state, action) => {
        console.log("this is a course "+action?.payload?.courses)
      state.coursedata = action?.payload?.courses;
    })
    .addCase(getallcoursebysearchterm.fulfilled,(state,action)=>{
      state.coursedata=action?.payload?.courses
    })
  },
});
export const {} = courseSlice.actions;
export default courseSlice.reducer;
