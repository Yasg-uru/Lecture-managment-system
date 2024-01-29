import React, { useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  createorder,
  getkey,
  verifyuser,
} from "../../Redux/Slices/paymentSlice.js";
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpaykey = useSelector((state) => state.razorpay.key);
  const order_id = useSelector((state) => state.razorpay.order_id);
  const name = useSelector((state) => state.auth.name);
  const { ispaymentverified } = useSelector((state) => state.razorpay);
  const email = useSelector((state) => state.auth.email);
  //storing the payment details after successfull transaction
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_order_id: "",
    razorpay_signature: "",
  };
  const handleorder = async (event) => {
    event.preventDefault();
    //checking for empty payment credentials
    if (!razorpaykey || !order_id) {
      return;
    }
    const options = {
      key: razorpaykey,
      amount: 100,
      currency: "INR",
      name: "lecture managment .Ltd",
      description: "LMS project",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.66elZ0rdKa61JlWQw8G7XgHaGf&pid=Api&P=0&h=180",
      order_id: order_id,
      handler: async function (response) {
        console.log("this is a response object:",response)
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_order_id = response.razorpay_order_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        console.log("payment detail" + paymentDetails);
        //displaying the success message
        toast.success("payment successfully");
        //verifying the payment
        const res = await dispatch(verifyuser(paymentDetails));

        //now redirecting the user according to the verification status
        ispaymentverified
          ? navigate('/success')
          : navigate("/failure")
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#F37254",
      },
    };
    const paymentobject = new window.Razorpay(options);
    paymentobject.open();
  };
  useEffect(() => {
    (async () => {
      await dispatch(getkey());
      await dispatch(createorder());
    })();
  }, []);
  return (
    <>
      <form
        onSubmit={handleorder}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        {/* checkout card */}
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all the available courses
              of our platform for{" "}
              <span className="text-yellow-500 font-bold">1 Year Duration</span>
              . <br />
              All the existing and new launched courses will be available to you
              in this subscription bundle
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee /> <span>499</span>only
            </p>

            <div className="text-gray-200">
              <p>100% refund at cancellation</p>
              <p>* Terms & Condition Applied</p>
            </div>
          </div>

          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full text-center py-2 text-xl font-bold rounded-bl-lg rounded-br-lg"
          >
            Buy Now
          </button>
        </div>
      </form>
    </>
  );
}
export default Checkout;
