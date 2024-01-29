import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import toast from "react-hot-toast";
import axios from "axios";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
  profile: localStorage.getItem("profile") || "",
  name: localStorage.getItem("name") || "",
  email: localStorage.getItem("email") || "",

  role: localStorage.getItem("role") || "",
  subscriptionstatus:localStorage.getItem("status") || "active"
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    console.log("this is a form data " + data);
    let res = await axiosInstance.post("user/register", data);

    toast.success("account created successfully");

    return res.data;
  } catch (error) {
    toast.error("account creattion failed");
  }
});
export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    let res = await axiosInstance.post("/user/login", data);
    toast.success("loggined successfully");
    return res.data;
  } catch (error) {
    toast.error("login failed");
  }
});

export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    let res = await axiosInstance.post("/user/logout");
    const toastpromise = toast.promise(res, {
      loading: "...Loading!",
      success: (data) => {
        return data?.data?.message || "logged out successfully";
      },
      error: "failed to logout",
    });
    await toastpromise;
    return res;
  } catch (error) {
    toast.error("Log out failed");
  }
});

export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email) => {
    try {
      let res = axiosInstance.post(
        "/user/password/forgot",
        { email },
        {
          withCredentials: true,
        }
      );

      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to send verification email",
      });

      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

export const getdata = createAsyncThunk("/auth/getdata", async () => {
  try {
    const res = axiosInstance.get("/user/me");
    return (await res).data;
  } catch (error) {
    toast.error(error?.message);
  }
});
export const updatepassword = createAsyncThunk(
  "/auth/updatepassword",
  async (formdata) => {
    try {
      let res = axiosInstance.post("/update/password", {
        formdata,
      });
      await toast.promise(res, {
        loading: "...loading",
        success: (data) => {
          return data?.data?.message;
        },
        error: "password updation failed",
      });
    } catch (error) {
      toast.error("failed password updation");
    }
  }
);
export const editprofile = createAsyncThunk(
  "/auth/editprofile",
  async (formdata) => {
    try {
      let formData = new FormData();
      formData.append("name", formdata.name);
      formData.append("email", formdata.email);
      formData.append("profile", formdata.profile);
      let res = axiosInstance.post("/user/editprofile", formData, {
        
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending files
        },
      });
      console.log("this is a res[onse" + res);

      await toast.promise(res, {
        loading: "...loading",
        success: (data) => {
          return data?.data?.message || "save changes succesfully";
        },
        error: "failed to save changes",
      });
      return (await res).data;
    } catch (error) {
      console.log("error is :", error);
      toast.error("failed to change");
      throw error; // Re-throw the error to mark the promise as rejected
    }
  }
);
export const deleteuser = createAsyncThunk("/auth/deleteuser", async () => {
  try {
    console.log("this is a deleted function ");
    const res = await axiosInstance.delete("/user/delete", {
      withCredentials: true,
    });
    toast.success("your account deleted successfully");
    return res.data;
  } catch (error) {
    toast.error("deletetion failed");
  }
});
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        // console.log("this is a action payload:", action.payload.user);
        localStorage.setItem("profile", action.payload.user.profile);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("name", action?.payload?.user?.name);
        localStorage.setItem("email", action?.payload?.user?.email);
        state.isLoggedIn = true;
        state.profile = action?.payload?.user;
        state.role = action?.payload?.user?.role;
        state.name = action?.payload?.user?.name;
        state.email = action?.payload?.user?.email;
      })

      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.profile = "";
        state.user = {};
      })
      .addCase(getdata.fulfilled, (state, action) => {
        localStorage.setItem("profile", action.payload.user.profile);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("role", action?.payload?.user?.role);
        localStorage.setItem("name", action?.payload?.user?.name);
        localStorage.setItem("email", action?.payload?.user?.email);
        state.isLoggedIn = true;
        state.user = action?.payload?.user;
        action.role = action?.payload?.user?.role;
        state.name = action?.payload?.user?.name;
        state.email = action?.payload?.user?.email;
      });
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
