const mongoose = require("mongoose");

const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    maxLength: [30, "name cannot have more than 30 characters"],
  },
  email: {
    type: String,
    require: [true, "please enter your email"],
    unique: true,
    valdate: [validator.isEmail, "please enter correct email pattern"],
  },
  enrolledcourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  password: {
    type: String,
    required: [true, "pleasse enter strong password"],
    minLength: [5, "your password should we greater than or equal to 5"],
  },
  subscription: {
    id: String,
    status: String,
  },
  profile: {
    type: String,
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getjwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
userSchema.methods.comparepassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.getresetpasswordToken = function () {
  const resettoken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000;
  return resettoken;
};
module.exports = mongoose.model("User", userSchema);
