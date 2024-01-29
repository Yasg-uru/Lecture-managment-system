const catchasyncerrors=(thefunction)=>(req,res,next)=>{
    thefunction(req,res,next).catch(next);

}
module.exports=catchasyncerrors;
