import mongoose from "mongoose";

const comment_Schema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },

  blogId: {
    type: mongoose.Schema.objectId,
    required: true,
    ref: "blog",
  },

  commmentedBy: {
    type: mongoose.Schema.objectId,
    required: true,
    ref: "user",
  },

  nextedComment:{
    type: mongoose.Schema.objectId,
    ref: "comment",
    default:null
  }

},{timestamps:true});

export const comment_model = mongoose.model("Comments", comment_Schema);
