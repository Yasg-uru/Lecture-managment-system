const Errorhandler = require("../utils/Errorhandler.utils.js");

const Payment = require("../models/payment.model.js");
const catchasyncerror = require("../middleware/catchasyncerror.middleware.js");
const User = require("../models/user.model.js");
const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpayinstance = new Razorpay({
  key_id: "rzp_live_tK7jKIBkQuTeH7",
  // key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: "d3q0tkLxfFVKoizPqeboYYsm",
});
exports.Createorder = catchasyncerror(async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);
    if (!user) {
      return next(new Errorhandler("user not found", 404));
    }
    // if (user.role === "admin") {
    //   return next(
    //     new Errorhandler("Admin cannot purchase a subscription", 404)
    //   );
    // }
    const options = {
      amount: 100, // amount in paise (e.g., 50000 paise = INR 500)
      currency: "INR",
      receipt: "order_receipt_" + Date.now(),
    };
    //createing a subscription uisng razorpay instance
    const order = await razorpayinstance.orders.create(options);

    //adding the id and the status to the user account
    // user.subscription.id = order.id;
    // user.subscription.status = order.status;
    //saving the user object
    await user.save();
    res.status(200).json({
      success: true,
      message: "your order created successfully",
      order_id: order.id,
    });
  } catch (error) {
    return next(
      new Errorhandler("error is occured in creattion of order", 500)
    );
  }
});

// exports.buycourse = catchasyncerror(async (req, res, next) => {
//   try {
//     const { _id } = req.user;
//     const user = await User.findById(_id);
//     if (!user) {
//       return next(new Errorhandler("user not found", 404));
//     }
//     // if (user.role == "admin") {
//     //   return next(new Errorhandler("admin can not purcahse the course"));
//     // }

//     //now adding the ad and the status to the users account
//     user.subscription.id = subscription.id;
//     user.subscription.status = subscription.status;
//     await user.save();
//     res.status(200).json({
//       success: true,
//       message: "subscribed succcessfully",
//       // subscription_id: subscription.id,
//     });
//   } catch (error) {
//     console.log("error is the :" + error.message);
//     return next(new Errorhandler("error is occured in subscription", error));
//   }
// });

exports.verification = catchasyncerror(async (req, res, next) => {
  const { _id } = req.user;
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    // const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } =
    req.body;
  const user = User.findById(_id);
  if (!user) {
    return next(new Errorhandler("user not found"));
  }
  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  //check if generated signature and the signature received from frontend is same or not
  if (generated_signature != razorpay_signature) {
    return next(new Errorhandler("payment not verified", 404));
  }
  // if they match then create a payment and store it in the db
  await Payment.create({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });
  //update the user subcription status to active
  user.subscription.status = "active";
  await user.save();
  res.status(200).json({
    success: true,
    message: "payment is verified successfully",
  });
});

//cancel subscription
exports.cancelsubscription = catchasyncerror(async (req, res, next) => {
  const { _id } = req.user;
  //finding the user
  const user = await User.find(id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  //checking if role of the user is admin
  if (user.role == "admin") {
    return next(
      new Errorhandler("admin does not need to cancel subscription", 404)
    );
  }
  //finding the subscription id from the subscription
  const subscriptionid = user.subscription.id;
  //canceling the subscription using razorpay that  we imported from the server
  try {
    const subscription = await razorpay.subscriptions.cancel(subscriptionid);
    //adding the subscription status to the user acccount
    user.subscription.status = subscription.status;
    await user.save();
  } catch (error) {
    return next(new Errorhandler(error?.error?.description, error?.statuscode));
  }
  // finding the payment uisng the subscription id
  const payment = await Payment.findOne({
    razorpay_payment_id: subscriptionid,
  });
  //getting the time for date of successfull payment (in milliseconds)
  const timesincesubscribed = Date.now() - payment.createdAt;
  //refund period which in our case is 14 days
  const refundperiod = 14 * 24 * 60 * 60 * 1000;
  //chekc if refund period has expired or not
  if (refundperiod <= timesincesubscribed) {
    return next(
      new Errorhandler(
        "refund is over , so wil not be any refund provided",
        400
      )
    );
  }

  //if refund period is valid then the full amount that the user has paid
  await razorpay.payments.refund(payment.razorpay_payment_id, {
    speed: "optimum",
  });
  user.subscription.id = undefined;
  user.subscription.status = undefined;
  await user.save();
  await payment.remove();
  res.status(200).json({
    success: true,
    message: "subscription canceled successfully",
  });
});

exports.getrazorpayapikey = catchasyncerror(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "razorpay api key ",
    key: process.env.RAZORPAY_KEY_ID,
  });
});
