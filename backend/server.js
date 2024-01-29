const dotenv=require('dotenv');
const connectdatabase=require('../backend/config/database.js')
const app=require('./app.js')



dotenv.config({path:"backend/config/config.env"});

  
connectdatabase()
app.listen(process.env.PORT,()=>{
    console.log(`server is running on PORT: ${process.env.PORT}`)
});