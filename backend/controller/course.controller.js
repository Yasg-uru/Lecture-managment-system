const Errorhandler = require("../utils/Errorhandler.utils.js");
const catchasyncerror = require("../middleware/catchasyncerror.middleware.js");
const Course = require("../models/course.model.js");
const User = require("../models/user.model.js");
const Lecture = require("../models/lecture.model.js");
const uploadOnCloudinary = require("../utils/cloudinary.utils.js");

exports.createcourse = catchasyncerror(async (req, res, next) => {
  try {
  const { title, description, price, category, createdby } = req.body;
  console.log("this is a title:" + title);
  let thumbnail = {};
  if (!req.file) {
    return next(new Errorhandler("file not found ", 404));
  }
  const cloudinary = await uploadOnCloudinary(req.file.path);
  thumbnail.public_id = req.file.originalname;
  // thumbnail.secure_url = req.file.path;
  thumbnail.secure_url = cloudinary.secure_url;

  const course = await Course.create({
    title,
    description,
    category,
    price,
    createdby,
    thumbnail,
  });
  res.status(200).json({
    success: true,
    course,
  });
  } catch (error) {
    return next(new Errorhandler("internal server error", 500));
  }
});

exports.deletecourse = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = Course.findById(id);
    if (!course) {
      return next(new Errorhandler("course not found", 404));
    }
    const resp = await Course.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (error) {
    return next(new Errorhandler("internal server error is occured"));
  }
});

exports.updatecourse = catchasyncerror(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, createdby } = req.body;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        price,
        createdby,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return next(new Errorhandler("internal server error", 500));
  }
});
exports.getallthecourse = catchasyncerror(async (req, res, next) => {
  const limit = req.query.limit || 5;
  const search = req.query.search || "";
  const page = req.query.page || 1;

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  let startindex = (page - 1) * limit;
  let endindex = startindex + limit - 1;
  const courses = await Course.find(query)
    .limit(limit)
    .skip(startindex)
    .select("-lectures");
  const totalcourses = query
    ? await Course.countDocuments(query)
    : await Course.countDocuments();
  const totalpages = Math.ceil(totalcourses / limit);
  const hasnextpage = endindex < totalcourses;
  res.status(200).json({
    success: true,
    courses,
    hasnextpage,
    totalpages,
    totalcourses,
  });
});

exports.addlecture = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;
  let course = await Course.findById(id);
  if (!course) {
    return next(new Errorhandler("course not found", 404));
  }
  const lecture = await Lecture.create({
    title,
    description,
  });
  course.lectures.push(lecture._id);
  await course.save();
  res.status(200).json({
    success: true,
    course,
  });
});
