const multer=require('multer')
const path=require('path')

const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log("uploading file:"+__dirname)
    //   cb(null, path.join(__dirname,"temporary/"));
    cb(null, path.join(__dirname, 'temporary/'));
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname);
    }
  });
  
console.log("Multer us ")
const upload = multer({ storage: Storage }); // Corrected variable name
module.exports = upload; // Corrected variable name
