import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosinstance";
import { toast } from "react-hot-toast";
const initialState = {
  key: "",
  order_id: "",
  ispaymentverified: false,
};
export const getkey = createAsyncThunk("razorpayId/get", async () => {
  try {
    const res = await axiosInstance.get("/payment/getkey");
    toast.success("key fetched successfully");
    return res.data;
  } catch (error) {
    toast.error("faild to fetch razorpay key ");
  }
});
export const createorder = createAsyncThunk(
  "razorpay/createcourse",
  async () => {
    try {
      const res = await axiosInstance.post("/payment/createorder");
      toast.success("order created successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "error is occured in order creation"
      );
    }
  }
);
// export const createcourse=createAsyncThunk("razorpay/creatcourse",async ()=>{
//   try {
//     const res=await axiosInstance.post('/payment/creatcourse');
//     toast.success("course created successfully");
//     console.log("this is data of the creatcourse:"+res.data)
//     return res.data;
//   } catch (error) {
//     toast.error("error is occured in creation of course");
//   }
// })
export const createcourse = createAsyncThunk(
  "razorpay/createcourse",
  async () => {
    try {
      const res = await axiosInstance.post("/payment/createcourse");
      toast.success("course created successfully");
      console.log("this is data of the createcourse: " + res.data);
      return res.data;
    } catch (error) {
      toast.error("error occurred in creation of course");
      throw error; // Re-throw the error to make it propagate
    }
  }
);

export const verifyuser = createAsyncThunk(
  "razorpay/verfiy",
  async (paymentdetail) => {
    try {
      const res = await axiosInstance.post("/payment/verify", {
        razorpay_payment_id: paymentdetail.razorpay_payment_id,
        razorpay_order_id: paymentdetail.razorpay_order_id,
        razorpay_signature: paymentdetail.razorpay_signature,
      });
      return res.data;
    } catch (error) {
      toast.error("error is occured in verfication ");
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getkey.rejected, () => {
        toast.error("failed to fetch key");
      })
      .addCase(getkey.fulfilled, (state, action) => {
        state.key = action?.payload?.key;
      })
      .addCase(createcourse.fulfilled, (state, action) => {
        console.log("this is a payload of the creatcourse " + action?.payload);
        state.order_id = action?.payload?.order_id;
      })
      .addCase(verifyuser.fulfilled, (state, action) => {
        toast.success(action?.payload?.message);
        state.ispaymentverified = true;
      })
      .addCase(verifyuser.rejected, (state, action) => {
        toast.error("verification failed ");
        state.ispaymentverified = false;
      });
  },
});
export const {} = razorpaySlice.actions;
export default razorpaySlice.reducer;
