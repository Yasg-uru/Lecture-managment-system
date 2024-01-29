const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const bodyparser=require('body-parser')
 
const app=express();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());

const userRouter=require('../backend/route/user.route.js');
const courseRouter=require('../backend/route/course.route.js');
const LectureRouter=require('../backend/route/Lecture.route.js')
const paymentRouter=require('../backend/route/payment.route.js')
app.use('/user',userRouter);
app.use('/course',courseRouter);
app.use('/lecture',LectureRouter);
app.use('/payment',paymentRouter);


module.exports=app;