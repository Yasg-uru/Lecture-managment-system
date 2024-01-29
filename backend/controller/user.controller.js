const User = require("../models/user.model.js");
const catchasyncerrors = require("../middleware/catchasyncerror.middleware.js");
const sendToken = require("../utils/sendtoken.utils.js");
const Errorhandler = require("../utils/Errorhandler.utils.js");
const sendmail = require("../utils/sendmail.utils.js");
const crypto = require("crypto");

exports.createuser = catchasyncerrors(async (req, res, next) => {
  // console.log("this is a request body"+req.body)
  const { name, email, password } = req.body;
  const profile = req.file.path;
  const user = await User.create({
    name,
    email,
    password,
    profile,
  });
  // const token=user.getjwtToken()
  sendToken(res, user, 200);
});

//now creating login method
exports.loginuser = catchasyncerrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Errorhandler("please enter email and password", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(
      new Errorhandler("please enter correct email or password", 400)
    );
  }
  const comparepassword = await user.comparepassword(password);
  if (!comparepassword) {
    return next(new Errorhandler("please enter correct email or password"));
  }
  sendToken(res, user, 200);
});

//logout user
exports.logout = catchasyncerrors(async (req, res, next) => {
  await res.cookie("token", null, {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out successfully",
  });
});

//get user details if user is logged in
exports.getdetail = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  res.json({
    success: true,
    user,
  });
});

exports.editprofile = catchasyncerrors(async (req, res, next) => {
  // try {

  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  //now user exist
  const { name, email } = req.body;
  const profile = req.file.path;
  let newuser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name,
      email,
      profile,
    },
    { new: true, validateBeforeSave: true }
  );
  res.status(200).json({
    success: true,
    message: "changes saved ",
    newuser,
  });
  // } catch (error) {
  //   return next(new Errorhandler("internal server error", 500));
  // }
});
// forgot password
exports.forgotpassword = catchasyncerrors(async (req, res, next) => {
  // console.log("this is a email:"+req.body.email)
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  const token = user.getresetpasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPassword = `${req.protocol}://${req.get(
    "host"
  )}/getnotes/password/reset/${token}`;
  console.log(resetPassword);

  const message = `Your password reset token is:\n\n${resetPassword}\n\nIf you have not requested this email, please ignore it.`;
  try {
    await sendmail({
      email: user.email,
      subject: "getnotes password recovery",
      message: message,
    });
    res.status(200).json({
      success: true,
      message: "email sent",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new Errorhandler(error.message, 500));
  }
});

//resetpassword
exports.resetpassword = catchasyncerrors(async (req, res, next) => {
  // now we have resetpassword token and their time
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  if (req.body.password !== req.body.confirmpassword) {
    return next(new Errorhandler("password not match", 404));
  } else {
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
  }
  sendToken(res, user, 200);
});

//update password
exports.updatepassword = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  const ispasswordmatched = await user.comparepassword(req.body.oldpassword);
  if (!ispasswordmatched) {
    return next(new Errorhandler("oldpassword is incorrect", 404));
  }
  if (req.body.newpassword !== req.body.confirmpassword) {
    return next(new Errorhandler("please enter correct password"));
  }
  user.password = req.body.newpassword;
  await user.save();
  sendToken(res, user, 200);
});

//creating admin pannel for updating particular user role and get allusers and getsingleuser,and deleting user with their id
exports.getalluser = catchasyncerrors(async (req, res, next) => {
  const user = await User.find({});
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  res.status(200).json({
    success: true,
    user: user,
  });
});

//get single user with id
exports.getsingleuser = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
//update user profile
exports.updateuserprofile = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const newuser = {
    name: req.body.name,
    email: req.body.email,
  };
  if (!user) {
    return next(new Errorhandler("user not found"));
  }
  const updateduser = await User.findByIdAndUpdate(req.params.id, newuser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    updateduser,
  });
});

//update particular user
exports.updateuserrole = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  const newuser = {
    role: req.body.role,
  };
  if (!user) {
    return next(new Errorhandler("user not found"));
  }
  const updateduser = await User.findByIdAndUpdate(req.params.id, newuser, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    updateduser,
  });
});

exports.deleteuser = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  await User.findByIdAndDelete(req.body.id);
  res.status(200).json({
    success: true,
    message: "deleted user successfully",
  });
});
exports.deleteuserbyuser = catchasyncerrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new Errorhandler("user not found", 404));
  }
  await User.findByIdAndDelete(req.user.id);
  res.status(200).json({
    success: true,
    message: "deleted user successfully",
  });
});

//movie saving related information
exports.savemovie = catchasyncerrors(async (req, res, next) => {
  try {
    const movieid = req.params.id;
    const movie = await Movie.findById(movieid);
    if (!movie) {
      return next(new Errorhandler("movie not found", 404));
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new Errorhandler("user not found ", 404));
    }
    if (!user.savedmovies.includes(movieid)) {
      user.savedmovies.push(movieid);
      await user.save();
    }
    res.status(200).json({
      success: true,
      message: "movie saved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
});

//get all saved movies
exports.getallsavedmovies = catchasyncerrors(async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("savedmovies");
    if (!user) {
      return next(new Errorhandler("user not found", 404));
    }

    const savedmovies = user.savedmovies;
    res.status(200).json({
      success: true,
      savedmovies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "internal server error ",
    });
  }
});

exports.getenrolledcourses=catchasyncerrors(async (req,res,next)=>{
  try {
    
    const {_id}=req.user;
    const user=await User.findById(_id);
    if(!user){
      return next(new Errorhandler("user not found",404));
    }
    const enrolledcourses=await User.findById(_id).populate('enrolledcourses');
    res.status(200).json({
      success:true,
      message:"data fetched successfully",
      enrolledcourses
    })


  } catch (error) {
    return next(new Errorhandler("internal server error ",500))
  }
})

