const express=require('express');
const { createlecture, deletelecture, getlecturesbycourse } = require('../controller/Lecture.controller.js');
const router=express.Router();
const upload = require('../middleware/multer.middleware.js');
const { isauthenicated, authorization } = require('../middleware/auth.middleware.js');
router.route('/addlecture/:id').post(isauthenicated,authorization('admin'),upload.single('lecture'),createlecture);

router.route('/deletelecture/:courseid/:lectureid').delete(isauthenicated,authorization('admin'),deletelecture)
router.route("/getlectures/:id").get(isauthenicated,getlecturesbycourse);
module.exports=router;