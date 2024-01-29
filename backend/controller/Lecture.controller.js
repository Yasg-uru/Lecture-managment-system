const Course = require("../models/course.model.js");
const Lecture = require("../models/lecture.model.js");
const catchasyncerror = require("../middleware/catchasyncerror.middleware.js");
const Errorhandler = require("../utils/Errorhandler.utils.js");
const uploadOnCloudinary=require("../utils/cloudinary.utils.js")
exports.createlecture = catchasyncerror(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if(!course){
    return next(new Errorhandler("course not found",404))
  }
  const { title, description } = req.body;
  let lecture = {};
  
  const cloudinary=await uploadOnCloudinary(req.file.path)
  lecture.public_id = req.file.originalname;
  lecture.secure_url =cloudinary.secure_url;
  if (!course) {
    return next(new Errorhandler("course not found", 404));
  }
  const lectures = await Lecture.create({
    title,
    description,
    lecture,
  });
  course.lectures.push(lectures._id);
  await course.save();
  res.status(200).json({
    success: true,
    course,
  });
});

exports.deletelecture=catchasyncerror(async (req,res,next)=>{

    const {courseid,lectureid}=req.params;

    const course=await Course.findById(courseid);
    if(!course){
        return next(new Errorhandler("course not found"),404)
    }
    
     course.lectures.pull(lectureid);
     await course.save();
     await Lecture.findByIdAndDelete(lectureid);
     res.status(200).json({
        success:true,
        message:"lecture deleted successfully"
     });
});

exports.getlecturesbycourse=catchasyncerror(async (req,res,next)=>{
  try {
     const {id}=req.params;
     let course=await Course.findById(id);
     if(!course){
      return next(new Errorhandler("course not found "));

     }
     else{
     course=await Course.findById(id).populate("lectures");

    }
    res.status(200).json({
      success:true,
      message:"lectures loaded successfully"
      ,
      course
    })
  } catch (error) {
    return next(new Errorhandler("internal server error "));
  }
});
