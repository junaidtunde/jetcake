import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    help: "This field is required"
  },
  password: {
    type: String,
    required: true,
    help: "This field is required"
  },
  photo: {
    type: String,
    required: true,
    help: "This field is required"
  },
  phone: {
    type: String,
    required: true,
    help: "This field is required"
  },
  address: {
    type: String,
    required: true,
    help: "This field is required"
  },
  dob: {
    type: Date,
    required: true,
    help: "This field is required"
  },
  security_answer_1: {
    type: String,
    required: true,
    help: "This field is required"
  },
  security_answer_2: {
    type: String,
    required: true,
    help: "This field is required"
  },
  security_answer_3: {
    type: String,
    required: true,
    help: "This field is required"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

//Write some "pre" functions

//
const User = mongoose.model("User", userSchema);

export default User;
