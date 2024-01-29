const sendtoken= async function(res,user,statuscode){
    const token=user.getjwtToken();
    const options={
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        user:user,
        token:token
    })


} 

module.exports=sendtoken;
