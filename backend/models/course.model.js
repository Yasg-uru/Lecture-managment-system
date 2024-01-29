const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter the title of the course"],
    },
    description: {
      type: String,
      required: [true, "please enter the description of the course"],
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "please enter the category of the course"],
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
    lectures: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecture",
      },
    ],
    enrolledbycourse: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    numberofLecture: {
      type: String,
      default: 0,
    },
    createdby: {
      type: String,
      required: [true, "course instructure name is required"],
    },
  },
  {
    timestamps: true,
  }
);

const coursemodel = mongoose.model("Course", courseSchema);
module.exports = coursemodel;
