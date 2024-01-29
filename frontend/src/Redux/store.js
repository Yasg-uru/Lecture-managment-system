import {configureStore} from "@reduxjs/toolkit"
import authSliceReducer from "./Slices/authSlice.js";
import courseSlice from "./Slices/courseSlice.js";
import razorpaySlice from "./Slices/paymentSlice.js"
import lectureSlice from "./Slices/lectureSlice.js"
const store=configureStore({
reducer:{
    auth:authSliceReducer,
    course:courseSlice,
    razorpay:razorpaySlice,
    lecture:lectureSlice
},
devTools:true

});
export default store;