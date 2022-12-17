import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  requirements: {
    type: String,
    required: true,
  },
  // img: {
  //     type: String,
  //     required: true,
  // },
  deadline: {
    type: String,
    required: true,
  },
  negotiable: {
    type: String,
    required: true,
  },
  contactno: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  uploadTime: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

export default mongoose.model("Blog", blogSchema);
