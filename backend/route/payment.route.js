const express=require('express');
const { getrazorpayapikey,  Createorder,  } = require('../controller/payment.controller');
const { isauthenicated } = require('../middleware/auth.middleware');
const router=express.Router();

router.route('/getkey').get(isauthenicated,getrazorpayapikey);
// router.route('/subscribe').post(isauthenicated,buycourse);
router.route('/createorder').post(isauthenicated,Createorder);

module.exports=router;