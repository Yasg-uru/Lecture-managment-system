const mongoose=require('mongoose');


const connectdatabase=async()=>{
    try {
       const resposne= await mongoose.connect('mongodb://127.0.0.1:27017/LMS');
        console.log(`database is connected : ${resposne.connection.host}`)

    } catch (error) {
        console.log(`we are unable to connect with database : ${error}`)
    }
}
module.exports=connectdatabase;