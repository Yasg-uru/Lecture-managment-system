const mongoose = require("mongoose");
const lectureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter the title of the course"],
  },
  description: {
    type: String,
    required: [true, "please entern the description of the course"],
  },
  lecture: {
    public_id: {
      type: String,
      required: [true, "please enter the public id of the lecture"],
    },
    secure_url: {
      type: String,
      required: [true, "please select the file "],
    },
  },
  assignment: [
    {
      title: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  ],
  rescources:{
    type:String,
    
  }
});

const Lecture = mongoose.model("lecture", lectureSchema);
module.exports = Lecture;
